import { faker } from '@faker-js/faker';
import { Movie, MovieGenre } from '../../../domain/interfaces/movie.interface';

/**
 * Servicio encargado de la generación y gestión de películas.
 *
 * @remarks
 * Este servicio utiliza la librería `faker` para generar películas
 * ficticias, principalmente con fines de prueba o demostración.
 */
export class MoviesService {

  /**
   * Géneros disponibles para las películas.
   *
   * @remarks
   * Se utilizan para asignar aleatoriamente un género
   * a cada película generada.
   */
  private genres: MovieGenre[] = [
    'Accion',
    'Comedia',
    'Drama',
    'Terror',
    'Ciencia Ficcion',
  ];

  /**
   * Obtiene un listado de películas generadas dinámicamente.
   *
   * @param countMovies Cantidad de películas a generar
   * @returns Promesa que resuelve un arreglo de películas
   *
   * @example
   * ```ts
   * const movies = await moviesService.getAllMovies(10);
   * ```
   */
  public async getAllMovies(countMovies: number): Promise<Movie[]> {
    const movies: Promise<Movie>[] = [];

    for (let i = 1; i <= countMovies; i++) {
      movies.push(this.generateMovie(i));
    }

    return Promise.all(movies);
  }

  /**
   * Genera una película ficticia.
   *
   * @param id Identificador único de la película
   * @returns Promesa que resuelve una película generada
   */
  private generateMovie(id: number): Promise<Movie> {
    return Promise.resolve({
      id,
      title: this.generateTitle(),
      releaseYear: faker.number.int({ min: 1970, max: 2024 }),
      rating: faker.number.float({ min: 1, max: 10, fractionDigits: 1 }),
      genre: faker.helpers.arrayElement(this.genres),
    });
  }

  /**
   * Genera un título de película ficticio.
   *
   * @remarks
   * Construye un título con palabras aleatorias y aplica
   * formato de título (cada palabra inicia en mayúscula).
   *
   * @returns Título de película generado
   */
  private generateTitle(): string {
    const words = faker.word.words({ count: { min: 2, max: 4 } });

    return words
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
