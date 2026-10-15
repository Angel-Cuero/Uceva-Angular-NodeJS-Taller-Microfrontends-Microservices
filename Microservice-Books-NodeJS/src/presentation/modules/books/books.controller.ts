import { Request, Response } from "express";
import { HandleError } from "../../../domain/erros/handle.error";
import { BooksService } from "./books.service";

/**
 * Controlador de libros.
 *
 * @remarks
 * Esta clase maneja las peticiones HTTP relacionadas con libros,
 * delegando la lógica de negocio al `BooksService`.
 */
export class BooksController {

  /**
   * Servicio de libros.
   */
  private readonly booksService = new BooksService();

  /**
   * Maneja la petición HTTP para obtener un listado de libros.
   *
   * @remarks
   * El número de libros a generar se obtiene desde los
   * parámetros de la ruta.
   *
   * @param req Objeto de petición de Express
   * @param res Objeto de respuesta de Express
   *
   * @example
   * ```http
   * GET /books/10
   * ```
   */
  getAllBooks = (req: Request, res: Response): void => {
    const { countBooks } = req.params;

    setTimeout(() => {
      this.booksService
      .getAllBooks(Number(countBooks))
      .then((books) => res.status(201).json(books))
      .catch((error) => HandleError.error(error, res));
    }, 1000);
  };
}
