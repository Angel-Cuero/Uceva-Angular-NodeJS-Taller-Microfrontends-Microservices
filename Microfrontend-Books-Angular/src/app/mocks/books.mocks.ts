import { Book } from "../interfaces/book.interface";

/**
 * Datos simulados de libros utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los componentes,
 * servicios y páginas sin necesidad de realizar peticiones HTTP reales.
 */
export const BOOKS_MOCK: Book[] = [
    {
        id: 1,
        title: 'Cien Años de Soledad',
        author: 'Gabriel García Márquez',
        genre: 'Novela',
        year: 1967,
    },
    {
        id: 2,
        title: 'El Principito',
        author: 'Antoine de Saint-Exupéry',
        genre: 'Cuento',
        year: 1943,
    },
    {
        id: 3,
        title: 'Clean Code',
        author: 'Robert C. Martin',
        genre: 'Tecnico',
        year: 2008,
    }
];
