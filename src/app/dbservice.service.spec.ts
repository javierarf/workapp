import { TestBed } from '@angular/core/testing';
import { DbserviceService } from './dbservice.service';
import { MockDbserviceService } from './mock-dbservice.service';
import { ToastController } from '@ionic/angular';
import { of } from 'rxjs';

describe('DbserviceService', () => {
  let service: DbserviceService;
  let mockService: MockDbserviceService;
  let toastControllerSpy: jasmine.SpyObj<ToastController>;

  beforeEach(() => {
    const toastSpy = jasmine.createSpyObj('ToastController', ['create']);
    TestBed.configureTestingModule({
      providers: [
        { provide: DbserviceService, useClass: MockDbserviceService },
        { provide: ToastController, useValue: toastSpy }
      ]
    });
    service = TestBed.inject(DbserviceService);
    mockService = TestBed.inject(DbserviceService) as unknown as MockDbserviceService;
    toastControllerSpy = TestBed.inject(ToastController) as jasmine.SpyObj<ToastController>;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load user data', (done) => {
    mockService.obtenerDatos('nombre_de_usuario').subscribe(userData => {
      expect(userData).toEqual({
        usuario: 'nombre_de_usuario',
        edad: '30',
        altura: '180',
        peso: '75',
        email: 'test@example.com'
      });
      done();
    });
  });

  it('should update user data', (done) => {
    spyOn(mockService, 'updateUser').and.callThrough();
    service.updateUser('nombre_de_usuario', '35', '185', '80', 'new@example.com').subscribe(() => {
      expect(mockService.updateUser).toHaveBeenCalledWith(
        'nombre_de_usuario', '35', '185', '80', 'new@example.com'
      );
      done();
    });
  });
});