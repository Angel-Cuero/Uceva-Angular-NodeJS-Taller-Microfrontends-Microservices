import { Component, Input } from '@angular/core';
import { BadgeAtom, BadgeType } from '@brejcha13320/design-system-bootstrap';
import { BookGenre, Book } from '../../interfaces/book.interface';

/**
 * Componente de tabla de libros.
 *
 * Se utiliza para mostrar un listado de libros en una tabla,
 * mostrando información como id, título, autor, género y año,
 * junto con un badge visual que indica el género de cada libro.
 *
 * @remarks
 * Este componente recibe los libros desde un componente padre
 * a través del Input `books` y utiliza el mapeo `genreMap`
 * para asignar colores a los badges según el género.
 *
 * Forma parte de la capa de presentación de la aplicación y se considera
 * un **organismo** dentro del sistema de diseño atómico.
 *
 * @example
 * ```html
 * <app-books-table [books]="booksList"></app-books-table>
 * ```
 */
@Component({
  selector: 'app-books-table',
  templateUrl: './books-table.component.html',
  imports: [BadgeAtom],
})
export class BooksTableComponent {
  /**
   * Listado de libros que se mostrarán en la tabla.
   * @type {Book[]}
   * @remarks
   * Este Input permite pasar un array de libros desde un componente padre,
   * generalmente `BooksPage`. Cada libro debe cumplir la interfaz `Book`.
   */
  @Input() books: Book[] = [];

  /**
   * Mapeo de géneros de libros a tipos de Badge.
   * @type {Record<BookGenre, BadgeType>}
   * @remarks
   * Se utiliza para asignar colores de badges a cada género:
   * - 'Novela' → 'primary' (azul)
   * - 'Cuento' → 'warning' (amarillo)
   * - 'Poesia' → 'success' (verde)
   * - 'Ensayo' → 'secondary' (gris)
   * - 'Tecnico' → 'danger' (rojo)
   *
   * Esto permite que en la tabla cada libro tenga un badge visual que indique su género
   * de forma clara para el usuario.
   */
  genreMap: Record<BookGenre, BadgeType> = {
    'Novela': 'primary',
    'Cuento': 'warning',
    'Poesia': 'success',
    'Ensayo': 'secondary',
    'Tecnico': 'danger',
  };
}
