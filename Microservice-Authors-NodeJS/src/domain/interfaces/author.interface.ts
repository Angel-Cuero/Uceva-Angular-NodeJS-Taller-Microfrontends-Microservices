/**
 * Interfaz que representa un autor.
 *
 * Contiene la información básica necesaria para mostrar un autor
 * en la tabla o en cualquier componente de listado.
 *
 * @remarks
 * Cada autor debe tener un `id` único, nombres y apellidos,
 * una `nationality` válida y la cantidad de `booksCount` publicados.
 *
 * @example
 * ```ts
 * const autor: Author = {
 *   id: 1,
 *   name: 'Gabriel',
 *   lastName: 'García Márquez',
 *   nationality: 'Colombiana',
 *   booksCount: 25
 * };
 * ```
 */
export interface Author {
  /** Identificador único del autor */
  id: number;

  /** Nombre del autor */
  name: string;

  /** Apellido del autor */
  lastName: string;

  /** Nacionalidad del autor */
  nationality: AuthorNationality;

  /** Cantidad de libros publicados por el autor */
  booksCount: number;
}

/**
 * Tipo de nacionalidad de un autor.
 *
 * @remarks
 * Este tipo restringe las nacionalidades a los valores predefinidos:
 * - 'Colombiana'
 * - 'Argentina'
 * - 'Mexicana'
 * - 'Espanola'
 * - 'Chilena'
 *
 * Se utiliza principalmente para mapear badges de colores en la UI.
 *
 * @example
 * ```ts
 * const nacionalidad: AuthorNationality = 'Argentina';
 * ```
 */
export type AuthorNationality = 'Colombiana' | 'Argentina' | 'Mexicana' | 'Espanola' | 'Chilena';
