/**
 * Interfaz que representa un libro.
 *
 * Contiene la información básica necesaria para mostrar un libro
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada libro debe tener un `id` único, un `title` descriptivo,
 * un `author`, un `genre` válido y un `year` de publicación.
 *
 * @example
 * ```ts
 * const libro: Book = {
 *   id: 1,
 *   title: 'Cien Años de Soledad',
 *   author: 'Gabriel García Márquez',
 *   genre: 'Novela',
 *   year: 1967
 * };
 * ```
 */
export interface Book {
  /** Identificador único del libro */
  id: number;

  /** Título del libro */
  title: string;

  /** Autor del libro */
  author: string;

  /** Género literario del libro */
  genre: BookGenre;

  /** Año de publicación del libro */
  year: number;
}

/**
 * Tipo de género literario.
 *
 * @remarks
 * Este tipo restringe los géneros a los valores predefinidos:
 * - 'Novela'
 * - 'Cuento'
 * - 'Poesia'
 * - 'Ensayo'
 * - 'Tecnico'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const genero: BookGenre = 'Ensayo';
 * ```
 */
export type BookGenre = 'Novela' | 'Cuento' | 'Poesia' | 'Ensayo' | 'Tecnico';
