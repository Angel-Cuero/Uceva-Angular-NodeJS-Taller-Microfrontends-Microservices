import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Author } from '../../interfaces/author.interface';
import { AUTHORS_MOCK } from '../../mocks/authors.mocks';
import { AuthorsService } from './authors.service';

describe('AuthorsService', () => {
  let service: AuthorsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ]
    });
    service = TestBed.inject(AuthorsService);
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

  describe('getAllAuthors', () => {

    it('debería realizar una petición GET y retornar una lista de autores', () => {
      const countAuthors = 5;
      const mockAuthors: Author[] = AUTHORS_MOCK;

      service.getAllAuthors(countAuthors).subscribe((authors) => {
        expect(authors).toEqual(mockAuthors);
        expect(authors.length).toBe(mockAuthors.length);
      });

      const req = httpMock.expectOne(`http://localhost:3005/api/authors/${countAuthors}`);
      expect(req.request.method).toBe('GET');

      req.flush(mockAuthors);
    });

    it('debería propagar un error si la petición HTTP falla', () => {
      const countAuthors = 3;

      service.getAllAuthors(countAuthors).subscribe({
        next: () => {
          fail('No debería emitir datos cuando ocurre un error');
        },
        error: (error) => {
          expect(error.status).toBe(500);
        },
      });

      const req = httpMock.expectOne(`http://localhost:3005/api/authors/${countAuthors}`);

      req.flush(
        { message: 'Error interno del servidor' },
        { status: 500, statusText: 'Internal Server Error' }
      );
    });

  });

});
