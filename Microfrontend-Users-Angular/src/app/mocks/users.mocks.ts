import { User } from "../interfaces/users.interface";

/**
 * Datos simulados de usuarios utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los componentes,
 * servicios y páginas sin necesidad de realizar peticiones HTTP reales.
 */
export const USERS_MOCK: User[] = [
    {
        id: 1,
        name: 'Carlos',
        lastName: 'Ramírez',
        age: 22,
        email: 'carlos.ramirez@example.com',
        engineering: 'Sistemas',
    },
    {
        id: 2,
        name: 'Ana',
        lastName: 'Gómez',
        age: 24,
        email: 'ana.gomez@example.com',
        engineering: 'Industrial',
    }
];