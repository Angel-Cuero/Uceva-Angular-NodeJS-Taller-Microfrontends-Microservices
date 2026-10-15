import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoviesPage } from './movies.page';
import { provideHttpClient } from '@angular/common/http';
import { MoviesService } from '../../services/movies/movies.service';
import { MoviesTableComponent } from '../../components/movies-table/movies-table.component';
import { of, throwError } from 'rxjs';
import { MOVIES_MOCK } from '../../mocks/movies.mocks';
import { By } from '@angular/platform-browser';

describe('MoviesPage', () => {
  let component: MoviesPage;
  let fixture: ComponentFixture<MoviesPage>;
  let moviesService: MoviesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MoviesPage, MoviesTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoviesPage);
    component = fixture.componentInstance;
    moviesService = TestBed.inject(MoviesService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllMovies al iniciar', () => {
    const spyGetAllMovies = jest.spyOn(moviesService, 'getAllMovies').mockReturnValue(of(MOVIES_MOCK));
    fixture.detectChanges();
    expect(spyGetAllMovies).toHaveBeenCalled();
  });

  it('debería asignar las películas recibidas del servicio', () => {
    jest.spyOn(moviesService, 'getAllMovies').mockReturnValue(of(MOVIES_MOCK));
    fixture.detectChanges();
    expect(component.movies).toEqual(MOVIES_MOCK);
  });

  it('debería pasar las películas al componente movies-table', () => {
    jest.spyOn(moviesService, 'getAllMovies').mockReturnValue(of(MOVIES_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(MoviesTableComponent))
      .componentInstance;
    expect(tableComponent.movies).toEqual(MOVIES_MOCK);
  });

  it('debería manejar el error cuando falla getAllMovies', () => {
    component.movies = [];
    const errorResponse = new Error('Error al cargar películas');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(moviesService, 'getAllMovies').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(moviesService.getAllMovies).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.movies.length).toBe(0);
  });
});
