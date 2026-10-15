import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * Componente raíz de la aplicación.
 *
 * @remarks
 * Este componente actúa como punto de entrada principal
 * de la aplicación Angular del Microfrontend de Autores.
 * Define la estructura base y renderiza las vistas según
 * el sistema de rutas.
 */
@Component({
  selector: 'app-root',
  template: '<router-outlet />',
  styleUrl: './app.scss',
  imports: [RouterOutlet],
})
export class App { }
