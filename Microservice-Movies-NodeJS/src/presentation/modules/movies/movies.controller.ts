import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { MoviesService } from "./movies.service";

/**
 * Controlador de películas.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con películas,
 * delegando la lógica de negocio al `MoviesService`.
 */
export class MoviesController {

  /**
   * Servicio de películas.
   */
  private readonly moviesService = new MoviesService();

  /**
   * Maneja la petición HTTP para obtener un listado de películas.
   *
   * @remarks
   * El número de películas a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /movies/10
   * ```
   */
  getAllMovies = (req: Request, res: Response): void => {
    const { countMovies } = req.params;

    setTimeout(() => {
      this.moviesService
      .getAllMovies(Number(countMovies))
      .then((movies) => res.status(201).json(movies))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
