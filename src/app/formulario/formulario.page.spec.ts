import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormularioPage } from './formulario.page';
import { AlertController, IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MockDbserviceService } from '../mock-dbservice.service';
import { DbserviceService } from '../dbservice.service';
import { of } from 'rxjs';

describe('FormularioPage', () => {
  let component: FormularioPage;
  let fixture: ComponentFixture<FormularioPage>;
  let mockDbserviceService: MockDbserviceService;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const alertSpy = jasmine.createSpyObj('AlertController', ['create']);
    const routerSpyObj = jasmine.createSpyObj('Router', ['navigate']);
    const activatedRouteStub = { snapshot: { paramMap: { get: (key: string) => 'test' } } };

    await TestBed.configureTestingModule({
      declarations: [FormularioPage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DbserviceService, useClass: MockDbserviceService },
        { provide: AlertController, useValue: alertSpy },
        { provide: Router, useValue: routerSpyObj },
        { provide: ActivatedRoute, useValue: activatedRouteStub }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(FormularioPage);
    component = fixture.componentInstance;
    mockDbserviceService = TestBed.inject(DbserviceService) as unknown as MockDbserviceService;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show alert when name and surname are empty', async () => {
    component.nombre = '';
    component.apellido = '';
    await component.mostrar();
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Mensaje',
      message: 'Error: nombre y apellido vacios',
      buttons: ['OK']
    });
  });

  it('should save data when name and surname are not empty', async () => {
    spyOn(mockDbserviceService, 'insertFormulario').and.returnValue(of('Datos guardados exitosamente'));
    component.nombre = 'John';
    component.apellido = 'Doe';
    await component.mostrar();
    expect(mockDbserviceService.insertFormulario).toHaveBeenCalledWith('John', 'Doe', component.selectedOption, component.selectedDate);
    expect(alertControllerSpy.create).toHaveBeenCalledWith({
      header: 'Mensaje',
      message: 'Datos guardados exitosamente',
      buttons: ['OK']
    });
  });

  it('should clear the form and local storage', () => {
    spyOn(localStorage, 'clear');
    component.limpiar();
    expect(component.nombre).toBe('');
    expect(component.apellido).toBe('');
    expect(component.selectedOption).toBe('');
    expect(component.selectedDate).toBe('');
    expect(localStorage.clear).toHaveBeenCalled();
  });

  it('should navigate to home', () => {
    component.home();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/tabs/home']);
  });
});
