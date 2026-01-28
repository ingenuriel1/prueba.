import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';

export interface LoginRequest {
  usuario: string;
  clave: string;
}

export interface LoginResponse {
  success: boolean;
  mensaje: string;
  token?: string;
}

interface Usuario {
  usuario: string;
  clave: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private usuarios: Usuario[] = [
    { usuario: 'admin', clave: '123456' },
    { usuario: 'usuario1', clave: 'password1' },
    { usuario: 'test', clave: 'test123' },
  ];

  autenticar(credenciales: LoginRequest): Observable<LoginResponse> {
    const usuarioEncontrado = this.usuarios.find(
      (u) => u.usuario === credenciales.usuario && u.clave === credenciales.clave
    );

    const response: LoginResponse = usuarioEncontrado
      ? {
          success: true,
          mensaje: 'Autenticación exitosa',
          token: 'token-local-' + btoa(credenciales.usuario + ':' + Date.now()),
        }
      : {
          success: false,
          mensaje: 'Usuario o contraseña incorrectos',
        };

    return of(response).pipe(delay(10));
  }
}
