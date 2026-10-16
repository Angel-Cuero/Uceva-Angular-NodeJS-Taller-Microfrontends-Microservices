import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { UsersService } from '../src/presentation/modules/users/users.service';
import { UsersController } from '../src/presentation/modules/users/users.controller';
import { CustomError } from '../src/domain/erros/custom.error';
import { HandleError } from '../src/domain/erros/handle.error';
import type { User } from '../src/domain/interfaces/user.interface';

/**
 * Pruebas unitarias del microservicio de usuarios.
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

test('UsersService.getAllUsers genera la cantidad solicitada con datos validos', async () => {
  const users = await new UsersService().getAllUsers(5);

  assert.equal(users.length, 5);
  assert.deepEqual(
    users.map((user) => user.id),
    [1, 2, 3, 4, 5],
  );

  for (const user of users) {
    assert.equal(typeof user.name, 'string');
    assert.equal(typeof user.lastName, 'string');
    assert.ok(user.age >= 18 && user.age <= 65, 'age fuera de rango');
    assert.match(user.email, /@/, 'email invalido');
    assert.ok(
      ['Sistemas', 'Electronica', 'Biomedica', 'Industrial', 'Ambiental'].includes(
        user.engineering,
      ),
      'engineering fuera del dominio',
    );
  }
});

test('UsersService.getAllUsers devuelve un arreglo vacio cuando count es 0', async () => {
  assert.deepEqual(await new UsersService().getAllUsers(0), []);
});

test('UsersController responde 201 con el listado de usuarios', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const users = [{ id: 1 }] as User[];
  const getAllUsers = mock.fn(async () => users);
  const controller = new UsersController();
  (controller as unknown as { usersService: unknown }).usersService = { getAllUsers };
  const res = createResponse();

  controller.getAllUsers(
    { params: { countUsers: '3' } } as unknown as Request,
    res as unknown as Response,
  );
  t.mock.timers.tick(1000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, users);
  assert.deepEqual(getAllUsers.mock.calls[0]!.arguments, [3]);
});

test('UsersController delega los CustomError a HandleError', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const controller = new UsersController();
  (controller as unknown as { usersService: unknown }).usersService = {
    getAllUsers: async () => {
      throw CustomError.badRequest('boom');
    },
  };
  const res = createResponse();

  controller.getAllUsers(
    { params: { countUsers: '1' } } as unknown as Request,
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
