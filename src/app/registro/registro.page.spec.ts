import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { DbserviceService } from '../dbservice.service';
import { RegistroPage } from './registro.page';
import { MockDbserviceService } from '../mock-dbservice.service';
import { of } from 'rxjs';

describe('RegistroPage', () => {
  let component: RegistroPage;
  let fixture: ComponentFixture<RegistroPage>;
  let mockDbservice: MockDbserviceService;
  let routerSpy = jasmine.createSpyObj('Router', ['navigate']);
  let alertControllerSpy = jasmine.createSpyObj('AlertController', ['create']);
  let alertSpy: any;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [RegistroPage],
      imports: [ReactiveFormsModule, IonicModule.forRoot()], 
      providers: [
        FormBuilder,
        { provide: Router, useValue: routerSpy },
        { provide: AlertController, useValue: alertControllerSpy },
        { provide: DbserviceService, useClass: MockDbserviceService }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistroPage);
    component = fixture.componentInstance;
    mockDbservice = TestBed.inject(DbserviceService) as unknown as MockDbserviceService;
    fixture.detectChanges();
    alertSpy = jasmine.createSpyObj('HTMLIonAlertElement', ['present']);
    alertControllerSpy.create.and.returnValue(Promise.resolve(alertSpy));
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form on ngOnInit', () => {
    component.ngOnInit();
    expect(component.formulario).toBeTruthy();
    expect(component.formulario.controls['usuario']).toBeTruthy();
    expect(component.formulario.controls['edad']).toBeTruthy();
    expect(component.formulario.controls['altura']).toBeTruthy();
    expect(component.formulario.controls['peso']).toBeTruthy();
    expect(component.formulario.controls['email']).toBeTruthy();
    expect(component.formulario.controls['password']).toBeTruthy();
  });

  it('should call dbservice.insertUsuario on guardaDatos', (done) => {
    spyOn(mockDbservice, 'insertUsuario').and.returnValue(of('Usuario insertado correctamente'));
    component.usuario = 'testUser';
    component.password = 'testPass';
    component.edad = '30';
    component.altura = '180';
    component.peso = '75';
    component.email = 'test@example.com';

    component.guardaDatos();

    setTimeout(() => {
      expect(mockDbservice.insertUsuario).toHaveBeenCalledWith('testUser', 'testPass', '30', '180', '75', 'test@example.com');
      done();
    }, 100);
  });

  it('should show alert on login with empty fields', async () => {
    component.usuario = '';
    component.password = '';

    await component.login();

    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Alerta',
      message: 'Error: nombre y apellido vacios',
      buttons: ['OK']
    });
    expect(alertSpy.present).toHaveBeenCalled();
  });

  it('should navigate to /tabs/home on successful guardaDatos', (done) => {
    spyOn(mockDbservice, 'insertUsuario').and.returnValue(of('Usuario insertado correctamente'));
    component.usuario = 'testUser';
    component.password = 'testPass';
    component.edad = '30';
    component.altura = '180';
    component.peso = '75';
    component.email = 'test@example.com';

    component.guardaDatos();

    setTimeout(() => {
      expect(routerSpy.navigate).toHaveBeenCalledWith(['/tabs/home']);
      done();
    }, 100);
  });
});
