/**
 * @openapi
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       description: Representa un libro del sistema
 *       required:
 *         - id
 *         - title
 *         - author
 *         - genre
 *         - year
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: Cien Años de Soledad
 *         author:
 *           type: string
 *           example: Gabriel García Márquez
 *         genre:
 *           type: string
 *           enum:
 *             - Novela
 *             - Cuento
 *             - Poesia
 *             - Ensayo
 *             - Tecnico
 *           example: Novela
 *         year:
 *           type: number
 *           example: 1967
 */
export {};
