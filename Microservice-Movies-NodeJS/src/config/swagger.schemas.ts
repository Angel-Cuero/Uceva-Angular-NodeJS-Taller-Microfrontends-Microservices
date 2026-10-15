/**
 * @openapi
 * components:
 *   schemas:
 *     Movie:
 *       type: object
 *       description: Representa una película del sistema
 *       required:
 *         - id
 *         - title
 *         - genre
 *         - releaseYear
 *         - rating
 *       properties:
 *         id:
 *           type: number
 *           example: 1
 *         title:
 *           type: string
 *           example: El Padrino
 *         genre:
 *           type: string
 *           enum:
 *             - Accion
 *             - Comedia
 *             - Drama
 *             - Terror
 *             - Ciencia Ficcion
 *           example: Drama
 *         releaseYear:
 *           type: number
 *           example: 1972
 *         rating:
 *           type: number
 *           example: 9.2
 */
export {};
