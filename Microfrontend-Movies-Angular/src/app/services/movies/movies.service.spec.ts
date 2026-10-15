import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Movie } from '../../interfaces/movie.interface';
import { MOVIES_MOCK } from '../../mocks/movies.mocks';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(MoviesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verifica que no queden peticiones HTTP pendientes
    httpMock.verify();
  });

  describe('Creación del servicio', () => {

    it('debería crearse correctamente', () => {
      expect(service).toBeTruthy();
    });

  });

  describe('getAllMovies', () => {

    it('debería realizar una petición GET y retornar una lista de películas', () => {
      const countMovies = 5;
      const mockMovies: Movie[] = MOVIES_MOCK;

      service.getAllMovies(countMovies).subscribe((movies) => {
        expect(movies).toEqual(mockMovies);
        expect(movies.length).toBe(mockMovies.length);
      });

      const req = httpMock.expectOne(`http://localhost:3003/api/movies/${countMovies}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockMovies);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countMovies = 3;

      service.getAllMovies(countMovies).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`http://localhost:3003/api/movies/${countMovies}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

  });

});
