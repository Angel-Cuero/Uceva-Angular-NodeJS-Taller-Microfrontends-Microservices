import { Routes } from '@angular/router';
import { loadRemoteModule } from '@angular-architects/module-federation';

/**
 * Definición de las rutas principales de la aplicación.
 *
 * @remarks
 * Este archivo contiene la configuración de enrutamiento
 * utilizada por Angular Router para mapear las URLs
 * a los componentes correspondientes.
 *
 * Incluye:
 * - Rutas de navegación principales
 * - Redirección por defecto para rutas no existentes
 *
 * @see {@link UsersPage}
 * @see {@link ProductsPage}
 * @see {@link MoviesPage}
 * @see {@link BooksPage}
 * @see {@link AuthorsPage}
 */
export const routes: Routes = [

  /**
   * Ruta de usuarios.
   *
   * @remarks
   * Renderiza el componente `UsersPage`, encargado
   * de mostrar y gestionar el listado de usuarios.
   */
  {
        path: 'users',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4201/remoteEntry.js',
                exposedModule: './UsersPage',
        }).then(m => m.UsersPage),
    },    
  /**
   * Ruta de productos.
   *
   * @remarks
   * Renderiza el componente `ProductsPage`, encargado
   * de mostrar y gestionar el listado de productos.
   */
    {
        path: 'products',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4202/remoteEntry.js',
                exposedModule: './ProductsPage',
        }).then(m => m.ProductsPage),
    },

  /**
   * Ruta de películas.
   *
   * @remarks
   * Renderiza el componente `MoviesPage` del Microfrontend de Películas,
   * encargado de mostrar y gestionar el listado de películas.
   */
    {
        path: 'movies',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4203/remoteEntry.js',
                exposedModule: './MoviesPage',
        }).then(m => m.MoviesPage),
    },

  /**
   * Ruta de libros.
   *
   * @remarks
   * Renderiza el componente `BooksPage` del Microfrontend de Libros,
   * encargado de mostrar y gestionar el listado de libros.
   */
    {
        path: 'books',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4204/remoteEntry.js',
                exposedModule: './BooksPage',
        }).then(m => m.BooksPage),
    },

  /**
   * Ruta de autores.
   *
   * @remarks
   * Renderiza el componente `AuthorsPage` del Microfrontend de Autores,
   * encargado de mostrar y gestionar el listado de autores.
   */
    {
        path: 'authors',
        loadComponent: () =>
            loadRemoteModule({
                type: 'module',
                remoteEntry: 'http://localhost:4205/remoteEntry.js',
                exposedModule: './AuthorsPage',
        }).then(m => m.AuthorsPage),
    },

  /**
   * Ruta comodín.
   *
   * @remarks
   * Captura cualquier ruta no definida y redirige
   * automáticamente a la ruta de usuarios.
   */
  { path: '**', redirectTo: 'users' },
];