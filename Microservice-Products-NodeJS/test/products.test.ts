import { test, mock } from 'node:test';
import assert from 'node:assert/strict';
import type { Request, Response } from 'express';

import { ProductsService } from '../src/presentation/modules/products/products.service';
import { ProductsController } from '../src/presentation/modules/products/products.controller';
import { CustomError } from '../src/domain/erros/custom.error';
import { HandleError } from '../src/domain/erros/handle.error';
import type { Product } from '../src/domain/interfaces/product.interface';

/**
 * Pruebas unitarias del microservicio de productos.
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

test('ProductsService.getAllProducts genera la cantidad solicitada con datos validos', async () => {
  const products = await new ProductsService().getAllProducts(3);

  assert.equal(products.length, 3);
  assert.deepEqual(
    products.map((product) => product.id),
    [1, 2, 3],
  );

  for (const product of products) {
    assert.equal(typeof product.name, 'string');
    assert.equal(typeof product.price, 'number');
    assert.ok(
      ['Lacteos', 'Carnes', 'Frutas', 'Verduras'].includes(product.category),
      'category fuera del dominio',
    );
  }
});

test('ProductsService.getAllProducts devuelve un arreglo vacio cuando count es 0', async () => {
  assert.deepEqual(await new ProductsService().getAllProducts(0), []);
});

test('ProductsController responde 201 con el listado de productos', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  const products = [{ id: 1 }] as Product[];
  const getAllProducts = mock.fn(async () => products);
  const controller = new ProductsController();
  (controller as unknown as { productsService: unknown }).productsService = { getAllProducts };
  const res = createResponse();

  controller.getAllProducts(
    { params: { countProducts: '4' } } as unknown as Request,
    res as unknown as Response,
  );
  t.mock.timers.tick(1000);
  await flushMicrotasks();

  assert.equal(res.statusCode, 201);
  assert.equal(res.body, products);
  assert.deepEqual(getAllProducts.mock.calls[0]!.arguments, [4]);
});

test('ProductsController delega los CustomError a HandleError', async (t) => {
  t.mock.timers.enable({ apis: ['setTimeout'] });
  t.mock.method(console, 'log', () => {});
  const controller = new ProductsController();
  (controller as unknown as { productsService: unknown }).productsService = {
    getAllProducts: async () => {
      throw CustomError.badRequest('boom');
    },
  };
  const res = createResponse();

  controller.getAllProducts(
    { params: { countProducts: '1' } } as unknown as Request,
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
