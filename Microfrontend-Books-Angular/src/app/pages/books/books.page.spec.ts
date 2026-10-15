import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksPage } from './books.page';
import { provideHttpClient } from '@angular/common/http';
import { BooksService } from '../../services/books/books.service';
import { BooksTableComponent } from '../../components/books-table/books-table.component';
import { of, throwError } from 'rxjs';
import { BOOKS_MOCK } from '../../mocks/books.mocks';
import { By } from '@angular/platform-browser';

describe('BooksPage', () => {
  let component: BooksPage;
  let fixture: ComponentFixture<BooksPage>;
  let booksService: BooksService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BooksPage, BooksTableComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksPage);
    component = fixture.componentInstance;
    booksService = TestBed.inject(BooksService);
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería llamar a getAllBooks al iniciar', () => {
    const spyGetAllBooks = jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    expect(spyGetAllBooks).toHaveBeenCalled();
  });

  it('debería asignar los libros recibidos del servicio', () => {
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    expect(component.books).toEqual(BOOKS_MOCK);
  });

  it('debería pasar los libros al componente books-table', () => {
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(of(BOOKS_MOCK));
    fixture.detectChanges();
    const tableComponent = fixture.debugElement
      .query(By.directive(BooksTableComponent))
      .componentInstance;
    expect(tableComponent.books).toEqual(BOOKS_MOCK);
  });

  it('debería manejar el error cuando falla getAllBooks', () => {
    component.books = [];
    const errorResponse = new Error('Error al cargar libros');

    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(booksService, 'getAllBooks').mockReturnValue(throwError(() => errorResponse));

    fixture.detectChanges();

    expect(booksService.getAllBooks).toHaveBeenCalled();
    expect(console.error).toHaveBeenCalledWith(errorResponse);
    expect(component.books.length).toBe(0);
  });
});
