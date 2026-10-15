import { Author } from "../interfaces/author.interface";

/**
 * Datos simulados de autores utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los componentes,
 * servicios y páginas sin necesidad de realizar peticiones HTTP reales.
 */
export const AUTHORS_MOCK: Author[] = [
    {
        id: 1,
        name: 'Gabriel',
        lastName: 'García Márquez',
        nationality: 'Colombiana',
        booksCount: 25,
    },
    {
        id: 2,
        name: 'Jorge Luis',
        lastName: 'Borges',
        nationality: 'Argentina',
        booksCount: 40,
    },
    {
        id: 3,
        name: 'Isabel',
        lastName: 'Allende',
        nationality: 'Chilena',
        booksCount: 22,
    }
];
