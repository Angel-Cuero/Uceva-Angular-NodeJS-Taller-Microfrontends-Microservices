import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthorsPage } from './authors.page';
import { provideHttpClient } from '@angular/common/http';
import { AuthorsService } from '../../services/authors/authors.service';
import { AuthorsTableComponent } from '../../components/authors-table/authors-table.component';
import { of, throwError } from 'rxjs';
import { AUTHORS_MOCK } from '../../mocks/authors.mocks';
import { By } from '@angular/platform-browser';

describe('AuthorsPage', () => {
  let component: AuthorsPage;
  let fixture: ComponentFixture<AuthorsPage>;
  let authorsService: AuthorsService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsPage, AuthorsTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsPage);
    component = fixture.componentInstance;
    authorsService = TestBed.inject(AuthorsService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllAuthors al iniciar', () => {
    const spyGetAllAuthors = jest.spyOn(authorsService, 'getAllAuthors').mockReturnValue(of(AUTHORS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllAuthors).toHaveBeenCalled();
  });

  it('debería asignar los autores recibidos del servicio', () => {
    jest.spyOn(authorsService, 'getAllAuthors').mockReturnValue(of(AUTHORS_MOCK));
    fixture.detectChanges();
    expect(component.authors).toEqual(AUTHORS_MOCK);
  });

  it('debería pasar los autores al componente authors-table', () => {
    jest.spyOn(authorsService, 'getAllAuthors').mockReturnValue(of(AUTHORS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(AuthorsTableComponent))
      .componentInstance;
    expect(tableComponent.authors).toEqual(AUTHORS_MOCK);
  });

  it('debería manejar el error cuando falla getAllAuthors', () => {
    component.authors = [];
    const errorResponse = new Error('Error al cargar autores');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(authorsService, 'getAllAuthors').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(authorsService.getAllAuthors).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.authors.length).toBe(0);
  });
});
