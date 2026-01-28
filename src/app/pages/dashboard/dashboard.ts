import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DashboardService, Persona } from '../../services/dashboard';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  personas: Persona[] = [];
  personaForm: Omit<Persona, 'id'> = {
    nombre: '',
    apellido: '',
    email: '',
    telefono: ''
  };
  editingId: number | null = null;
  showForm = false;

  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.loadPersonas();
  }

  loadPersonas(): void {
    this.personas = this.dashboardService.getPersonas();
  }

  openForm(): void {
    this.resetForm();
    this.showForm = true;
  }

  closeForm(): void {
    this.showForm = false;
    this.resetForm();
  }

  resetForm(): void {
    this.personaForm = { nombre: '', apellido: '', email: '', telefono: '' };
    this.editingId = null;
  }

  editPersona(persona: Persona): void {
    this.editingId = persona.id;
    this.personaForm = {
      nombre: persona.nombre,
      apellido: persona.apellido,
      email: persona.email,
      telefono: persona.telefono
    };
    this.showForm = true;
  }

  savePersona(): void {
    if (!this.personaForm.nombre || !this.personaForm.apellido) {
      return;
    }

    if (this.editingId) {
      this.dashboardService.updatePersona(this.editingId, this.personaForm);
    } else {
      this.dashboardService.createPersona(this.personaForm);
    }

    this.loadPersonas();
    this.closeForm();
  }

  deletePersona(id: number): void {
    if (confirm('¿Está seguro de eliminar esta persona?')) {
      this.dashboardService.deletePersona(id);
      this.loadPersonas();
    }
  }
}
