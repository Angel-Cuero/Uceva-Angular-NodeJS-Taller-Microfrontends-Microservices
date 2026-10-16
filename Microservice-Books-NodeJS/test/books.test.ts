import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { BooksService } from '../src/presentation/modules/books/books.service';
import { BooksController } from '../src/presentation/modules/books/books.controller';
import { CustomError } from '../src/domain/erros/custom.error';
import { HandleError } from '../src/domain/erros/handle.error';
import type { Book } from '../src/domain/interfaces/book.interface';

/**
 * Pruebas unitarias del microservicio de libros.
 *
 * Cubren el servicio (generacion de datos), el controlador HTTP y
 * los manejadores de error compartidos.
 */

/** Crea un `Response` falso que registra el status y el cuerpo enviados. */
function createResponse() {
  return {
    statusCode: undefined as number | undefined,
    body: undefined as unknown,
    status(code: number) {
      this.statusCode = code;
      return this;
    },
    json(payload: unknown) {
      this.body = payload;
      return this;
    },
  };
}

/** Permite que se resuelvan las microtareas pendientes del controlador. */
const flushMicrotasks = () => new Promise<void>((resolve) => setImmediate(resolve));

test('BooksService.getAllBooks genera la cantidad solicitada con datos validos', async () => {
  const books = await new BooksService().getAllBooks(4);

  assert.equal(books.length, 4);
  assert.deepEqual(
    books.map((book) => book.id),
    [1, 2, 3, 4],
  );

  for (const book of books) {
    assert.equal(typeof book.title, 'string');
    assert.equal(typeof book.author, 'string');
    assert.ok(book.year >= 1900 && book.year <= 2024, 'year fuera de rango');
    assert.ok(
      ['Novela', 'Cuento', 'Poesia', 'Ensayo', 'Tecnico'].includes(book.genre),
      'genre fuera del dominio',
    );
  }
});

test('BooksService.getAllBooks devuelve un arreglo vacio cuando count es 0', async () => {
  assert.deepEqual(await new BooksService().getAllBooks(0), []);
});

test('BooksController responde 201 con el listado de libros', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const books = [{ id: 1 }] as Book[];
  const getAllBooks = mock.fn(async () => books);
  const controller = new BooksController();
  (controller as unknown as { booksService: unknown }).booksService = { getAllBooks };
  const res = createResponse();

  controller.getAllBooks(
    { params: { countBooks: '5' } } as unknown as Request,
    res as unknown as Response,
  );
  t.mock.timers.tick(1000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, books);
  assert.deepEqual(getAllBooks.mock.calls[0]!.arguments, [5]);
});

test('BooksController delega los CustomError a HandleError', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const controller = new BooksController();
  (controller as unknown as { booksService: unknown }).booksService = {
    getAllBooks: async () => {
      throw CustomError.badRequest('boom');
    },
  };
  const res = createResponse();

  controller.getAllBooks(
    { params: { countBooks: '1' } } as unknown as Request,
    res as unknown as Response,
  );
  t.mock.timers.tick(1000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 400);
  assert.deepEqual(res.body, { error: 'boom' });
});

test('CustomError expone el statusCode y el mensaje de cada fabrica', () => {
  assert.equal(CustomError.badRequest('a').statusCode, 400);
  assert.equal(CustomError.unAuthorized('a').statusCode, 401);
  assert.equal(CustomError.forbidden('a').statusCode, 403);
  assert.equal(CustomError.notFound('a').statusCode, 404);
  assert.equal(CustomError.conflict('a').statusCode, 409);
  assert.equal(CustomError.internalServer('a').statusCode, 500);
  assert.equal(CustomError.notFound('no existe').message, 'no existe');
});

test('HandleError responde con el status del CustomError', (t) => {
  t.mock.method(console, 'log', () => {});
  const res = createResponse();

  HandleError.error(CustomError.notFound('nope'), res as unknown as Response);

  assert.equal(res.statusCode, 404);
  assert.deepEqual(res.body, { error: 'nope' });
});

test('HandleError responde 500 ante errores genericos', (t) => {
  t.mock.method(console, 'log', () => {});
  const res = createResponse();

  HandleError.error(new Error('inesperado'), res as unknown as Response);

  assert.equal(res.statusCode, 500);
  assert.deepEqual(res.body, { error: 'Internal Server error' });
});
