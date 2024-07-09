import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable()
export class MockDbserviceService {
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(true);

  constructor() {}

  obtenerDatos(usuario: string): Observable<any> {
    const userData = {
      usuario: usuario,
      edad: '30',
      altura: '180',
      peso: '75',
      email: 'test@example.com'
    };
    return of(userData);
  }

  updateUser(usuario: string, edad: string, altura: string, peso: string, email: string): Observable<any> {
    console.log(`Updating user ${usuario}`);
    return of('Usuario actualizado correctamente');
  }

  insertUsuario(usuario: string, password: string, edad: string, altura: string, peso: string, email: string): Observable<any> {
    console.log(`Inserting user ${usuario}`);
    return of('Usuario insertado correctamente');
  }

  insertFormulario(nombre: string, apellido: string, nivelEstudios: string, fechaNacimiento: string): Observable<any> {
    console.log(`Inserting formulario for ${nombre} ${apellido}`);
    return of('Formulario insertado correctamente');
  }

  getIsDBReady(): Observable<boolean> {
    return this.isDBReady.asObservable();
  }

  validarUsuario(usuario: string, password: string): Observable<any> {
    if (usuario === 'testuser' && password === 'testpassword') {
      return of({ isValid: true, message: 'Usuario validado correctamente' });
    } else {
      return of({ isValid: false, message: 'Credenciales inválidas' });
    }
  }
}
