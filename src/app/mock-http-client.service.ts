import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable()
export class MockHttpClient {

  constructor() {}

  // Simula el método get
  get(url: string): Observable<any> {
    // Implementación simulada, por ejemplo:
    const mockWeatherData = {
      main: { temp: 25, humidity: 50 },
      weather: [{ description: 'Sunny' }]
    };
    return of(mockWeatherData);
  }

  // Puedes simular otros métodos necesarios para tus pruebas

}