import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-buscador',
  imports: [CommonModule, FormsModule],
  templateUrl: './buscador.html',
  styleUrl: './buscador.css',
})
export class Buscador {
  @Input() lista: string[] = [];

  textoBusqueda: string = '';

  get resultadosFiltrados(): string[] {
    if (!this.textoBusqueda.trim()) {
      return this.lista;
    }

    const busqueda = this.textoBusqueda.toLowerCase();
    return this.lista.filter(item =>
      item.toLowerCase().includes(busqueda)
    );
  }
}
