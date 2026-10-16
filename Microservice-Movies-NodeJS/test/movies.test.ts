import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { MoviesService } from '../src/presentation/modules/movies/movies.service';
import { MoviesController } from '../src/presentation/modules/movies/movies.controller';
import { CustomError } from '../src/domain/erros/custom.error';
import { HandleError } from '../src/domain/erros/handle.error';
import type { Movie } from '../src/domain/interfaces/movie.interface';

/**
 * Pruebas unitarias del microservicio de peliculas.
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

test('MoviesService.getAllMovies genera la cantidad solicitada con datos validos', async () => {
  const movies = await new MoviesService().getAllMovies(6);

  assert.equal(movies.length, 6);
  assert.deepEqual(
    movies.map((movie) => movie.id),
    [1, 2, 3, 4, 5, 6],
  );

  for (const movie of movies) {
    assert.equal(typeof movie.title, 'string');
    assert.ok(movie.title.length > 0, 'title vacio');
    assert.ok(
      movie.releaseYear >= 1970 && movie.releaseYear <= 2024,
      'releaseYear fuera de rango',
    );
    assert.ok(movie.rating >= 1 && movie.rating <= 10, 'rating fuera de rango');
    assert.ok(
      ['Accion', 'Comedia', 'Drama', 'Terror', 'Ciencia Ficcion'].includes(movie.genre),
      'genre fuera del dominio',
    );
  }
});

test('MoviesService.getAllMovies devuelve un arreglo vacio cuando count es 0', async () => {
  assert.deepEqual(await new MoviesService().getAllMovies(0), []);
});

test('MoviesController responde 201 con el listado de peliculas', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const movies = [{ id: 1 }] as Movie[];
  const getAllMovies = mock.fn(async () => movies);
  const controller = new MoviesController();
  (controller as unknown as { moviesService: unknown }).moviesService = { getAllMovies };
  const res = createResponse();

  controller.getAllMovies(
    { params: { countMovies: '2' } } as unknown as Request,
    res as unknown as Response,
  );
  t.mock.timers.tick(1000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, movies);
  assert.deepEqual(getAllMovies.mock.calls[0]!.arguments, [2]);
});

test('MoviesController delega los CustomError a HandleError', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const controller = new MoviesController();
  (controller as unknown as { moviesService: unknown }).moviesService = {
    getAllMovies: async () => {
      throw CustomError.badRequest('boom');
    },
  };
  const res = createResponse();

  controller.getAllMovies(
    { params: { countMovies: '1' } } as unknown as Request,
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
