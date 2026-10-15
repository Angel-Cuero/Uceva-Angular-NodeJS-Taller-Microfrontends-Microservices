import { faker } from '@faker-js/faker';
import { Author, AuthorNationality } from '../../../domain/interfaces/author.interface';

/**
 * Servicio encargado de la generación y gestión de autores.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar autores
 * ficticios, principalmente con fines de prueba o demostración.
 */
export class AuthorsService {

  /**
   * Nacionalidades disponibles para los autores.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente una nacionalidad
   * a cada autor generado.
   */
  private nationalities: AuthorNationality[] = [
    'Colombiana',
    'Argentina',
    'Mexicana',
    'Espanola',
    'Chilena',
  ];

  /**
   * Obtiene un listado de autores generados dinámicamente.
   *
   * @param countAuthors Cantidad de autores a generar
   * @returns Promesa que resuelve un arreglo de autores
   *
   * @example
   * ```ts
   * const authors = await authorsService.getAllAuthors(10);
   * ```
   */
  public async getAllAuthors(countAuthors: number): Promise<Author[]> {
    const authors: Promise<Author>[] = [];

    for (let i = 1; i <= countAuthors; i++) {
      authors.push(this.generateAuthor(i));
    }

    return Promise.all(authors);
  }

  /**
   * Genera un autor ficticio.
   *
   * @param id Identificador único del autor
   * @returns Promesa que resuelve un autor generado
   */
  private generateAuthor(id: number): Promise<Author> {
    return Promise.resolve({
      id,
      name: faker.person.firstName(),
      lastName: faker.person.lastName(),
      booksCount: faker.number.int({ min: 1, max: 60 }),
      nationality: faker.helpers.arrayElement(this.nationalities),
    });
  }
}
