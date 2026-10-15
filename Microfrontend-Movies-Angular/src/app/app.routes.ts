import { Routes } from '@angular/router';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * @see {@link MoviesPage}
 */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/movies/movies.page').then((m) => m.MoviesPage),
  },
];
