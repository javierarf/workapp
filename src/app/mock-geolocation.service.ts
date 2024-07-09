import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { InjectionToken } from '@angular/core';

export const GEOLOCATION_TOKEN = new InjectionToken('GEOLOCATION_TOKEN');

@Injectable()
export class MockGeolocation {

  constructor() {}

  // Simula el método getCurrentPosition
  getCurrentPosition(): Promise<any> {
    // Implementación simulada, por ejemplo:
    return Promise.resolve({
      coords: { latitude: 40.7128, longitude: -74.0060 }
    });
  }


}