import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AUTHORS_MOCK } from '../../mocks/authors.mocks';
import { AuthorsTableComponent } from './authors-table.component';

describe('AuthorsTableComponent', () => {
  let component: AuthorsTableComponent;
  let fixture: ComponentFixture<AuthorsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthorsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AuthorsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('debería crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('debería renderizar una tabla', () => {
    const table = fixture.debugElement.query(By.css('table'));
    expect(table).toBeTruthy();
  });

  it('debería renderizar una fila por cada autor', () => {
    component.authors = AUTHORS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));
    expect(rows.length).toBe(component.authors.length);
  });

  it('debería mostrar los datos del autor en cada columna', () => {
    component.authors = AUTHORS_MOCK;
    fixture.detectChanges();

    const rows = fixture.debugElement.queryAll(By.css('tbody tr'));

    rows.forEach((row, index) => {
      const columns = row.queryAll(By.css('th, td'));
      const author = component.authors[index];

      expect(columns[0].nativeElement.textContent.trim()).toBe(String(author.id));
      expect(columns[1].nativeElement.textContent.trim()).toBe(author.name);
      expect(columns[2].nativeElement.textContent.trim()).toBe(author.lastName);
      expect(columns[4].nativeElement.textContent.trim()).toBe(String(author.booksCount));
    });
  });

  it('debería mapear cada nacionalidad a su BadgeType correcto', () => {
    expect(component.nationalityMap['Colombiana']).toBe('warning');
    expect(component.nationalityMap['Argentina']).toBe('primary');
    expect(component.nationalityMap['Mexicana']).toBe('success');
    expect(component.nationalityMap['Espanola']).toBe('danger');
    expect(component.nationalityMap['Chilena']).toBe('secondary');
  });

});
