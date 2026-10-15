import { Component, inject } from '@angular/core';
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { Movie } from '../../interfaces/movie.interface';
import { MoviesService } from '../../services/movies/movies.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de películas.
 *
 * Se utiliza para gestionar y mostrar un listado de películas
 * utilizando el componente `MoviesTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `MoviesService`
 * para obtener las películas y pasarlas al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  imports: [MoviesTableComponent, AlertComponent],
})
export class MoviesPage {
  /**
   * Listado de películas obtenidas desde el servicio.
   * @type {Movie[]}
   */
  movies: Movie[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener películas.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private moviesService = inject(MoviesService);

  /**
   * Inicializa el componente y carga las películas.
   * @remarks
   * Se suscribe al método `getAllMovies()` del servicio y
   * asigna los datos recibidos a la propiedad `movies`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.moviesService.getAllMovies(10).subscribe({
      next: (movies) => {
        this.movies = movies;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
