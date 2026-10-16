import { Product } from "../interfaces/products.interface";

/**
 * Datos simulados de productos utilizados en las pruebas unitarias.
 *
 * @remarks
 * Este arreglo permite verificar el comportamiento de los componentes,
 * servicios y páginas sin necesidad de realizar peticiones HTTP reales.
 */
export const PRODUCTS_MOCK: Product[] = [
    {
        id: 1,
        name: 'Leche entera',
        category: 'Lacteos',
        price: 4500,
    },
    {
        id: 2,
        name: 'Manzana roja',
        category: 'Frutas',
        price: 3200,
    }
];