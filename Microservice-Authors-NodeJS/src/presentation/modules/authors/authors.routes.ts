import { Router } from "express";
import { AuthorsController } from "./authors.controller";

export class AuthorsRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new AuthorsController();

    /**
     * @openapi
     * /api/authors/{countAuthors}:
     *   get:
     *     summary: Obtener listado de autores
     *     description: Retorna una lista de autores generados dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Authors
     *     parameters:
     *       - in: path
     *         name: countAuthors
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de autores a generar
     *     responses:
     *       200:
     *         description: Lista de autores generados
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Author'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countAuthors", controller.getAllAuthors);

    return router;
  }
}
