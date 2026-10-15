import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { MovieGenre, Movie } from '../../interfaces/movie.interface';

/**
 * Componente de tabla de películas.
 *
 * Se utiliza para mostrar un listado de películas en una tabla,
 * mostrando información como id, título, género, año y calificación,
 * junto con un badge visual que indica el género de cada película.
 *
 * @remarks
 * Este componente recibe las películas desde un componente padre
 * a través del Input `movies` y utiliza el mapeo `genreMap`
 * para asignar colores a los badges según el género.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-movies-table [movies]="moviesList"></app-movies-table>
 * ```
 */
@Component({
  selector: 'app-movies-table',
  templateUrl: './movies-table.component.html',
  imports: [BadgeAtom],
})
export class MoviesTableComponent {
  /**
   * Listado de películas que se mostrarán en la tabla.
   * @type {Movie[]}
   * @remarks
   * Este Input permite pasar un array de películas desde un componente padre,
   * generalmente `MoviesPage`. Cada película debe cumplir la interfaz `Movie`.
   */
  @Input() movies: Movie[] = [];

  /**
   * Mapeo de géneros de películas a tipos de Badge.
   * @type {Record<MovieGenre, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada género:
   * - 'Accion' → 'danger' (rojo)
   * - 'Comedia' → 'warning' (amarillo)
   * - 'Drama' → 'primary' (azul)
   * - 'Terror' → 'secondary' (gris)
   * - 'Ciencia Ficcion' → 'success' (verde)
   *
   * Esto permite que en la tabla cada película tenga un badge visual que indique su género
   * de forma clara para el usuario.
   */
  genreMap: Record<MovieGenre, BadgeType> = {
    'Accion': 'danger',
    'Comedia': 'warning',
    'Drama': 'primary',
    'Terror': 'secondary',
    'Ciencia Ficcion': 'success',
  };
}
