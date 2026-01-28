import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface LoginRequest {
  usuario: string;
  clave: string;
}

export interface LoginResponse {
  success: boolean;
  mensaje: string;
  token?: string;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private http = inject(HttpClient);
  private apiUrl = 'https://api.ejemplo.com/auth/login';

  autenticar(credenciales: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.apiUrl, credenciales);
  }
}
