/**
 * @openapi
 * components:
 *   schemas:
 *     Author:
 *       type: object
 *       description: Representa un autor del sistema
 *       required:
 *         - id
 *         - name
 *         - lastName
 *         - nationality
 *         - booksCount
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         name:
 *           type: string
 *           example: Gabriel
 *         lastName:
 *           type: string
 *           example: García Márquez
 *         nationality:
 *           type: string
 *           enum:
 *             - Colombiana
 *             - Argentina
 *             - Mexicana
 *             - Espanola
 *             - Chilena
 *           example: Colombiana
 *         booksCount:
 *           type: number
 *           example: 25
 */
export {};
