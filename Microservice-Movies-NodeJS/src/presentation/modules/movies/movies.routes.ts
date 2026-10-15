import { Router } from "express";
import { MoviesController } from "./movies.controller";

export class MoviesRoutes {
  static get routes(): Router {
    const router = Router();
    const controller = new MoviesController();

    /**
     * @openapi
     * /api/movies/{countMovies}:
     *   get:
     *     summary: Obtener listado de películas
     *     description: Retorna una lista de películas generadas dinámicamente según la cantidad solicitada.
     *     tags:
     *       - Movies
     *     parameters:
     *       - in: path
     *         name: countMovies
     *         required: true
     *         schema:
     *           type: integer
     *           minimum: 1
     *           example: 10
     *         description: Cantidad de películas a generar
     *     responses:
     *       200:
     *         description: Lista de películas generadas
     *         content:
     *           application/json:
     *             schema:
     *               type: array
     *               items:
     *                 $ref: '#/components/schemas/Movie'
     *       400:
     *         description: Parámetro inválido
     */
    router.get("/:countMovies", controller.getAllMovies);

    return router;
  }
}
