# 🧪 Taller: Microfrontends y Microservices en Angular y NodeJS

- Este proyecto fue generado utilizando [Angular CLI](https://github.com/angular/angular-cli) 20.3.14.

- El objetivo del taller es practicar la creación de 2 proyectos para representar la arquitectura
cliente servidor, con las Tecnologias de Angular y NodeJS.

## 📋 Requisitos Previos

Antes de iniciar, asegúrate de tener instaladas las siguientes herramientas:

- Node.js
- npm
- Angular CLI
- Git
- Visual Studio Code

Puedes verificar Angular CLI en consola con: ```ng version```

### 1️⃣ Instalar Dependencias

- Ubícate en la raíz del proyecto de Client-Host-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Users-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Products-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Movies-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Books-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microfrontend-Authors-Angular y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Users-NodeJS y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Products-NodeJS y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Movies-NodeJS y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Books-NodeJS y ejecuta el comando: ```npm i```
- Ubícate en la raíz del proyecto de Microservice-Authors-NodeJS y ejecuta el comando: ```npm i```


### 2️⃣ Ejecutar los Proyectos

**Opción 1: Ejecutar todo desde la raíz (Recomendado)**
- Ubícate en la raíz del repositorio y ejecuta: ```npm start```
- Esto levantará todos los microservicios (3001-3005), los microfrontends (4201-4205) y el host (4200) al mismo tiempo usando `concurrently`.

**Opción 2: Ejecutar cada proyecto por separado**
- Ubícate en la raíz del proyecto de Microservice-Users-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microservice-Products-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microservice-Movies-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microservice-Books-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microservice-Authors-NodeJS y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Users-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Products-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Movies-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Books-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Microfrontend-Authors-Angular y ejecuta el comando: ```npm run start```
- Ubícate en la raíz del proyecto de Client-Host-Angular y ejecuta el comando: ```npm run start```


### 3️⃣ Verificar Funcionamiento de Proyectos

#### Microservice-Users-NodeJS
- Corriendo en: ```http://localhost:3001```
- Swagger API Docs: ```http://localhost:3001/api/docs```
- API Users: ```http://localhost:3001/api/users/{countUsers}```

#### Microservice-Products-NodeJS
- Corriendo en: ```http://localhost:3002```
- Swagger API Docs: ```http://localhost:3002/api/docs```
- API Products: ```http://localhost:3002/api/products/{countProducts}```

#### Microservice-Movies-NodeJS
- Corriendo en: ```http://localhost:3003```
- Swagger API Docs: ```http://localhost:3003/api/docs```
- API Movies: ```http://localhost:3003/api/movies/{countMovies}```

#### Microservice-Books-NodeJS
- Corriendo en: ```http://localhost:3004```
- Swagger API Docs: ```http://localhost:3004/api/docs```
- API Books: ```http://localhost:3004/api/books/{countBooks}```

#### Microservice-Authors-NodeJS
- Corriendo en: ```http://localhost:3005```
- Swagger API Docs: ```http://localhost:3005/api/docs```
- API Authors: ```http://localhost:3005/api/authors/{countAuthors}```

#### Microfrontend-Users-Angular
- Corriendo en: ```http://localhost:4201```
- RemoteEntry: ```http://localhost:4201/remoteEntry.js```

#### Microfrontend-Products-Angular
- Corriendo en: ```http://localhost:4202```
- RemoteEntry: ```http://localhost:4202/remoteEntry.js```

#### Microfrontend-Movies-Angular
- Corriendo en: ```http://localhost:4203```
- RemoteEntry: ```http://localhost:4203/remoteEntry.js```
- Consume: Microservice-Movies-NodeJS (```http://localhost:3003/api/movies/{countMovies}```)

#### Microfrontend-Books-Angular
- Corriendo en: ```http://localhost:4204```
- RemoteEntry: ```http://localhost:4204/remoteEntry.js```
- Consume: Microservice-Books-NodeJS (```http://localhost:3004/api/books/{countBooks}```)

#### Microfrontend-Authors-Angular
- Corriendo en: ```http://localhost:4205```
- RemoteEntry: ```http://localhost:4205/remoteEntry.js```
- Consume: Microservice-Authors-NodeJS (```http://localhost:3005/api/authors/{countAuthors}```)

#### Client-Host-Angular
- Corriendo en: ```http://localhost:4200```
- Rutas: ```/users```, ```/products```, ```/movies```, ```/books```, ```/authors```
