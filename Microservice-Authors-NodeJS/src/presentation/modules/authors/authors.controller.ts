import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { AuthorsService } from "./authors.service";

/**
 * Controlador de autores.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con autores,
 * delegando la lógica de negocio al `AuthorsService`.
 */
export class AuthorsController {

  /**
   * Servicio de autores.
   */
  private readonly authorsService = new AuthorsService();

  /**
   * Maneja la petición HTTP para obtener un listado de autores.
   *
   * @remarks
   * El número de autores a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /authors/10
   * ```
   */
  getAllAuthors = (req: Request, res: Response): void => {
    const { countAuthors } = req.params;

    setTimeout(() => {
      this.authorsService
      .getAllAuthors(Number(countAuthors))
      .then((authors) => res.status(201).json(authors))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
