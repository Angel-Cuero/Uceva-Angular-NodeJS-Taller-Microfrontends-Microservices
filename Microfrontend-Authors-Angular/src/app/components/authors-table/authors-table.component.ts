import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { AuthorNationality, Author } from '../../interfaces/author.interface';

/**
 * Componente de tabla de autores.
 *
 * Se utiliza para mostrar un listado de autores en una tabla,
 * mostrando información como id, nombre, apellido, nacionalidad
 * y cantidad de libros, junto con un badge visual que indica
 * la nacionalidad de cada autor.
 *
 * @remarks
 * Este componente recibe los autores desde un componente padre
 * a través del Input `authors` y utiliza el mapeo `nationalityMap`
 * para asignar colores a los badges según la nacionalidad.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-authors-table [authors]="authorsList"></app-authors-table>
 * ```
 */
@Component({
  selector: 'app-authors-table',
  templateUrl: './authors-table.component.html',
  imports: [BadgeAtom],
})
export class AuthorsTableComponent {
  /**
   * Listado de autores que se mostrarán en la tabla.
   * @type {Author[]}
   * @remarks
   * Este Input permite pasar un array de autores desde un componente padre,
   * generalmente `AuthorsPage`. Cada autor debe cumplir la interfaz `Author`.
   */
  @Input() authors: Author[] = [];

  /**
   * Mapeo de nacionalidades de autores a tipos de Badge.
   * @type {Record<AuthorNationality, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada nacionalidad:
   * - 'Colombiana' → 'warning' (amarillo)
   * - 'Argentina' → 'primary' (azul)
   * - 'Mexicana' → 'success' (verde)
   * - 'Espanola' → 'danger' (rojo)
   * - 'Chilena' → 'secondary' (gris)
   *
   * Esto permite que en la tabla cada autor tenga un badge visual que indique su nacionalidad
   * de forma clara para el usuario.
   */
  nationalityMap: Record<AuthorNationality, BadgeType> = {
    'Colombiana': 'warning',
    'Argentina': 'primary',
    'Mexicana': 'success',
    'Espanola': 'danger',
    'Chilena': 'secondary',
  };
}
