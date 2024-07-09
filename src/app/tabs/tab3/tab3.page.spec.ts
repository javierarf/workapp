import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Tab3Page } from './tab3.page';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { DbserviceService } from 'src/app/dbservice.service';
import { MockDbserviceService } from 'src/app/mock-dbservice.service';
import { of } from 'rxjs';

describe('Tab3Page', () => {
  let component: Tab3Page;
  let fixture: ComponentFixture<Tab3Page>;
  let dbService: jasmine.SpyObj<DbserviceService>; 

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab3Page ],
      imports: [
        IonicModule.forRoot(),
        ReactiveFormsModule
      ],
      providers: [
        FormBuilder,
        { provide: DbserviceService, useClass: MockDbserviceService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab3Page);
    component = fixture.componentInstance;
    dbService = TestBed.inject(DbserviceService) as jasmine.SpyObj<DbserviceService>;    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load user data on initialization', () => {
    const usuario = 'testUser';

    const userData = {
      usuario: 'testUser',
      edad: '30',
      altura: '180',
      peso: '75',
      email: 'test@example.com'
    };
    spyOn(dbService, 'obtenerDatos').and.returnValue(of(userData));

    component.ngOnInit();

    expect(component.userForm.get('usuario')?.value).toEqual(userData.usuario);
    expect(component.userForm.get('edad')?.value).toEqual(userData.edad);
    expect(component.userForm.get('altura')?.value).toEqual(userData.altura);
    expect(component.userForm.get('peso')?.value).toEqual(userData.peso);
    expect(component.userForm.get('email')?.value).toEqual(userData.email);
  });

  it('should save user data', () => {
    const userData = {
      usuario: 'testUser',
      edad: '30',
      altura: '180',
      peso: '75',
      email: 'test@example.com'
    };

    spyOn(dbService, 'updateUser').and.returnValue(of(null));

    component.userForm.patchValue(userData);

    component.saveUserData();

    expect(dbService.updateUser).toHaveBeenCalledWith(
      userData.usuario,
      userData.edad,
      userData.altura,
      userData.peso,
      userData.email
    );
  });

});