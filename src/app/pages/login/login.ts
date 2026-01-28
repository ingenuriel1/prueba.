import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

  loginForm: FormGroup = this.fb.group({
    usuario: ['', Validators.required],
    clave: ['', Validators.required]
  });

  mensaje = '';
  cargando = false;

  onSubmit(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    this.loginService.autenticar(this.loginForm.value).subscribe({
      next: (response) => {
        this.cargando = false;
        if (response.success) {
          this.router.navigate(['/dashboard']);
        } else {
          this.mensaje = response.mensaje || 'Error de autenticación';
        }
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = 'Error al conectar con el servidor';
      }
    });
  }
}
