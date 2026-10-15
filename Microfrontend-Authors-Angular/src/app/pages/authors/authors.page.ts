import { Component, inject } from '@angular/core';
import { AuthorsTableComponent } from '../../components/authors-table/authors-table.component';
import { Author } from '../../interfaces/author.interface';
import { AuthorsService } from '../../services/authors/authors.service';
import { State } from '../../interfaces/state.interface';
import { AlertComponent } from '../../components/alert/alert.component';

/**
 * Componente contenedor de autores.
 *
 * Se utiliza para gestionar y mostrar un listado de autores
 * utilizando el componente `AuthorsTableComponent`.
 *
 * @remarks
 * Este componente se encarga de consumir el servicio `AuthorsService`
 * para obtener los autores y pasarlos al componente de tabla.
 * Forma parte de la capa de presentación de la aplicación.
 */
@Component({
  selector: 'app-authors',
  templateUrl: './authors.page.html',
  imports: [AuthorsTableComponent, AlertComponent],
})
export class AuthorsPage {
  /**
   * Listado de autores obtenidos desde el servicio.
   * @type {Author[]}
   */
  authors: Author[] = [];

  /**
   * Estado actual del componente.
   *
   * @default 'init'
   */
  state: State = 'init';

  /**
   * Servicio para obtener autores.
   * @remarks
   * Se inyecta utilizando la función `inject()` de Angular.
   */
  private authorsService = inject(AuthorsService);

  /**
   * Inicializa el componente y carga los autores.
   * @remarks
   * Se suscribe al método `getAllAuthors()` del servicio y
   * asigna los datos recibidos a la propiedad `authors`.
   */
  ngOnInit(): void {
    this.state = 'loading';
    this.authorsService.getAllAuthors(10).subscribe({
      next: (authors) => {
        this.authors = authors;
        this.state = 'success';
      },
      error: (error) => {
        console.error(error);
        this.state = 'error';
      },
    });
  }
}
