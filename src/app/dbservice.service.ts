import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@awesome-cordova-plugins/sqlite/ngx';
import { ToastController } from '@ionic/angular';
import { BehaviorSubject, of, switchMap } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class DbserviceService {

  public db!: SQLiteObject;
  private isDBReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(private sqlite: SQLite, private toastController: ToastController) {
    this.initDatabase(); 
   }

   private initDatabase() {
    this.sqlite.create({
      name: 'db.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
      this.createTable();
      this.isDBReady.next(true);
      this.presentToast('Base de datos y tabla creadas con éxito');
    }).catch(error => {
      console.error('Error al inicializar la base de datos:', error);
    });
  }

  private createTables() {
    this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS formularios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT,
        apellido TEXT,
        nivel_de_estudios TEXT,
        fecha_nacimiento TEXT
      )`, [])
      .then(() => this.presentToast('Table created'))
      .catch(error => this.presentToast('Error creating table' + error));
  }

  private createTable() {
    this.db.executeSql(
      `CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        usuario TEXT,
        password TEXT,
        edad TEXT,
        altura TEXT,
        peso TEXT,
        email TEXT
      )`, [])
      .then(() => this.presentToast('Table created'))
      .catch(error => this.presentToast('Error creating table' + error));
  }

  validarUsuario(usuario: string, password: string) {
    return this.getIsDBReady().pipe(
      switchMap(ready => {
        if (ready) {
          return this.db.executeSql('SELECT * FROM usuarios WHERE usuario = ? AND password = ?', [usuario, password])
            .then((res) => {
              if (res.rows.length > 0) {
                return res.rows.item(0); 
              } else {
                return null; 
              }
            })
            .catch(error => {
              this.presentToast('Error al obtener usuario por credenciales:' + error);
              return null;
            });
        } else {
          return of(null); 
        }
      })
    );
  }

  insertFormulario(nombre: string, apellido: string, nivelEstudios: string, fechaNacimiento: string) {
    return this.getIsDBReady().pipe(
      switchMap(ready => {
        if (ready) {
          return this.db.executeSql(`
            INSERT INTO formularios (nombre, apellido, nivel_de_estudios, fecha_nacimiento) VALUES (?, ?, ?, ?);
          `, [nombre, apellido, nivelEstudios, fechaNacimiento])
          .then(() => {
            this.presentToast('Formulario insertado correctamente');
          })
          .catch(error => {
            this.presentToast('Error al insertar formulario:' + error);
            throw error;
          });
        } else {
          return of(null); 
        }
      })
    );
  }

  insertUsuario(usuario: string, password: string, edad: string, altura: string, peso: string, email: string) {
    return this.getIsDBReady().pipe(
      switchMap(ready => {
        if (ready) {
          return this.db.executeSql(`
            INSERT INTO usuarios (usuario, password, edad, altura, peso, email) VALUES (?, ?, ?, ?, ?, ?);
          `, [usuario, password, edad, altura, peso, email])
          .then(() => {
            this.presentToast('Usuario insertado correctamente');
          })
          .catch(error => {
            this.presentToast('Error al insertar usuario:' + error);
            throw error; 
          });
        } else {
          return of(null); 
        }
      })
    );
  }

  private async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }

  getIsDBReady() {
    return this.isDBReady.asObservable();
  }


  obtenerDatos(usuario: string) {
    return this.getIsDBReady().pipe(
      switchMap(ready => {
        if (ready) {
          return this.db.executeSql('SELECT * FROM usuarios WHERE usuario = ?', [usuario])
            .then((res) => {
              if (res.rows.length > 0) {
                return res.rows.item(0); 
              } else {
                return null; 
              }
            })
            .catch(error => {
              this.presentToast('Error al obtener usuario por nombre:' + error);
              throw error; 
            });
        } else {
          return of(null); 
        }
      })
    );
  }

  updateUser(usuario: string, edad: string, altura: string, peso: string, email: string) {
    return this.getIsDBReady().pipe(
      switchMap(ready => {
        if (ready) {
          return this.db.executeSql(`
            UPDATE usuarios
            SET edad = ?, altura = ?, peso = ?, email = ?
            WHERE usuario = ?
          `, [edad, altura, peso, email, usuario])
          .then(() => {
            this.presentToast('Usuario actualizado correctamente');
          })
          .catch(error => {
            this.presentToast('Error al actualizar usuario:' + error);
            throw error; 
          });
        } else {
          return of(null); 
        }
      })
    );
  }
}