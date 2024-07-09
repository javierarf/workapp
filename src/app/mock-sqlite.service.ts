import { TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { DbserviceService } from './dbservice.service';

class MockSQLite {
  create(config: any) {
    return Promise.resolve({
      open: () => Promise.resolve(),
      close: () => Promise.resolve(),
      executeSql: () => Promise.resolve({ rows: [] })
    });
  }
}

describe('DbserviceService', () => {
  let service: DbserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [IonicModule.forRoot()],
      providers: [
        DbserviceService,
        { provide: SQLite, useClass: MockSQLite }
      ]
    });
    service = TestBed.inject(DbserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
