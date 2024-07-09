import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class MockActivatedRoute {

  private paramsSubject = new BehaviorSubject<any>({});
  params = this.paramsSubject.asObservable();

  constructor() {}

  // Método para simular cambios en los parámetros
  setParams(params: any) {
    this.paramsSubject.next(params);
  }
}