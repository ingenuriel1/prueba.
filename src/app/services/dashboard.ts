import { Injectable } from '@angular/core';

export interface Persona {
  id: number;
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
}

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private personas: Persona[] = [
    { id: 1, nombre: 'Juan', apellido: 'Pérez', email: 'juan@email.com', telefono: '123456789' },
    { id: 2, nombre: 'María', apellido: 'García', email: 'maria@email.com', telefono: '987654321' },
  ];
  private nextId = 3;

  getPersonas(): Persona[] {
    return [...this.personas];
  }

  getPersonaById(id: number): Persona | undefined {
    return this.personas.find(p => p.id === id);
  }

  createPersona(persona: Omit<Persona, 'id'>): Persona {
    const newPersona: Persona = { ...persona, id: this.nextId++ };
    this.personas.push(newPersona);
    return newPersona;
  }

  updatePersona(id: number, persona: Omit<Persona, 'id'>): Persona | null {
    const index = this.personas.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.personas[index] = { ...persona, id };
    return this.personas[index];
  }

  deletePersona(id: number): boolean {
    const index = this.personas.findIndex(p => p.id === id);
    if (index === -1) return false;
    this.personas.splice(index, 1);
    return true;
  }
}
