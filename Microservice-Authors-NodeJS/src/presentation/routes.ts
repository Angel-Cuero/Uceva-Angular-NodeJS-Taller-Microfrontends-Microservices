import { Router } from "express";
import { AuthorsRoutes } from "./modules/authors/authors.routes";

/**
 * Clase encargada de centralizar todas las rutas de la aplicación.
 *
 * @remarks
 * Proporciona un único punto de acceso a los endpoints
 * del backend, agrupando los módulos de autores.
 *
 * @example
 * ```ts
 * import express from 'express';
 * import { AppRoutes } from './app.routes';
 *
 * const app = express();
 * app.use(AppRoutes.routes);
 * ```
 */
export class AppRoutes {

  /**
   * Devuelve el router principal de la aplicación.
   *
   * @returns Router de Express con todas las rutas registradas
   */
  static get routes(): Router {
    const router = Router();

    // Definir rutas
    router.use("/api/authors", AuthorsRoutes.routes);

    return router;
  }
}
