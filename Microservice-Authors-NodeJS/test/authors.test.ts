import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { AuthorsService } from '../src/presentation/modules/authors/authors.service';
import { AuthorsController } from '../src/presentation/modules/authors/authors.controller';
import { CustomError } from '../src/domain/erros/custom.error';
import { HandleError } from '../src/domain/erros/handle.error';
import type { Author } from '../src/domain/interfaces/author.interface';

/**
 * Pruebas unitarias del microservicio de autores.
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

test('AuthorsService.getAllAuthors genera la cantidad solicitada con datos validos', async () => {
  const authors = await new AuthorsService().getAllAuthors(5);

  assert.equal(authors.length, 5);
  assert.deepEqual(
    authors.map((author) => author.id),
    [1, 2, 3, 4, 5],
  );

  for (const author of authors) {
    assert.equal(typeof author.name, 'string');
    assert.equal(typeof author.lastName, 'string');
    assert.ok(author.booksCount >= 1 && author.booksCount <= 60, 'booksCount fuera de rango');
    assert.ok(
      ['Colombiana', 'Argentina', 'Mexicana', 'Espanola', 'Chilena'].includes(
        author.nationality,
      ),
      'nationality fuera del dominio',
    );
  }
});

test('AuthorsService.getAllAuthors devuelve un arreglo vacio cuando count es 0', async () => {
  assert.deepEqual(await new AuthorsService().getAllAuthors(0), []);
});

test('AuthorsController responde 201 con el listado de autores', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const authors = [{ id: 1 }] as Author[];
  const getAllAuthors = mock.fn(async () => authors);
  const controller = new AuthorsController();
  (controller as unknown as { authorsService: unknown }).authorsService = { getAllAuthors };
  const res = createResponse();

  controller.getAllAuthors(
    { params: { countAuthors: '7' } } as unknown as Request,
    res as unknown as Response,
  );
  t.mock.timers.tick(1000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, authors);
  assert.deepEqual(getAllAuthors.mock.calls[0]!.arguments, [7]);
});

test('AuthorsController delega los CustomError a HandleError', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const controller = new AuthorsController();
  (controller as unknown as { authorsService: unknown }).authorsService = {
    getAllAuthors: async () => {
      throw CustomError.badRequest('boom');
    },
  };
  const res = createResponse();

  controller.getAllAuthors(
    { params: { countAuthors: '1' } } as unknown as Request,
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
