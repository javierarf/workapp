import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { LoginPage } from './login.page';
import { DbserviceService } from '../dbservice.service';
import { MockDbserviceService } from '../mock-dbservice.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LoginPage', () => {
  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let dbservice: DbserviceService;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginPage ],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule.withRoutes([]) 
      ],
      providers: [
        { provide: DbserviceService, useClass: MockDbserviceService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    dbservice = TestBed.inject(DbserviceService);
    router = TestBed.inject(Router);
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home page on successful login', async () => {
    spyOn(dbservice, 'validarUsuario').and.returnValue(of({ usuario:'testuser',password:'testpassword' }));
    spyOn(router, 'navigate').and.callFake(() => Promise.resolve(true));

    component.usuario = 'testuser';
    component.password = 'testpassword';

    await component.login();
    fixture.detectChanges();

    expect(dbservice.validarUsuario).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/tabs/home'], { state: { usuario: 'testuser', password: 'testpassword' } });
  });

});
