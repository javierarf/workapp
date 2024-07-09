import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { HomePage } from './home.page';

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let navControllerSpy: jasmine.SpyObj<NavController>;

  beforeEach(waitForAsync(() => {
    const navControllerSpyObj = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(),
        RouterTestingModule
      ],
      providers: [
        { provide: NavController, useValue: navControllerSpyObj }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    navControllerSpy = TestBed.inject(NavController) as jasmine.SpyObj<NavController>;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /formulario on formulario()', () => {
    
    component.formulario();
    
    expect(navControllerSpy.navigateRoot).toHaveBeenCalledWith('/formulario');
  });


});
