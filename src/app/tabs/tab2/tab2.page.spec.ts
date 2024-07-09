import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { Tab2Page } from './tab2.page';
import { HttpClient } from '@angular/common/http';
import { MockHttpClient } from 'src/app/mock-http-client.service';
import { GEOLOCATION_TOKEN  } from 'src/app/mock-geolocation.service';
import { MockGeolocation } from 'src/app/mock-geolocation.service';

describe('Tab2Page', () => {
  let component: Tab2Page;
  let fixture: ComponentFixture<Tab2Page>;
  let httpClient: MockHttpClient;
  let geolocation: MockGeolocation;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ Tab2Page ],
      imports: [ IonicModule.forRoot() ],
      providers: [
        { provide: HttpClient, useClass: MockHttpClient },
        { provide: GEOLOCATION_TOKEN, useClass: MockGeolocation }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Tab2Page);
    component = fixture.componentInstance;
    httpClient = TestBed.inject(HttpClient) as MockHttpClient;
    geolocation = TestBed.inject(GEOLOCATION_TOKEN) as MockGeolocation;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load weather data on initialization', async () => {
    spyOn(geolocation, 'getCurrentPosition').and.returnValue(Promise.resolve({ coords: { latitude: 40.7128, longitude: -74.0060 } }));

    await component.ngOnInit();

    expect(component.weatherData).toBeDefined();
    expect(component.weatherData.main.temp).toEqual(25);
    expect(component.weatherData.weather[0].description).toEqual('Sunny');
  });

});