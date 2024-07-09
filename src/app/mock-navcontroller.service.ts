import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule, NavController } from '@ionic/angular';
import { HomePage } from '../app/home/home.page';
import { DbserviceService } from '../app/dbservice.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

class MockNavController {
  navigateForward() {}
  navigateBack() {}
}

class MockActivatedRoute {
  snapshot = {
    paramMap: {
      get: (key: string) => 'someValue'
    }
  };
}

describe('HomePage', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DbserviceService, useClass: DbserviceService }, // Ajustar según tu mock
        { provide: NavController, useClass: MockNavController },
        { provide: ActivatedRoute, useClass: MockActivatedRoute },
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
