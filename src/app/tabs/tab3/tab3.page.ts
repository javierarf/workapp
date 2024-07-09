import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DbserviceService } from 'src/app/dbservice.service';

@Component({
  selector: 'app-tab3',
  templateUrl: './tab3.page.html',
  styleUrls: ['./tab3.page.scss'],
})
export class Tab3Page implements OnInit {
  userForm: FormGroup;
  usuario: string = 'nombre_de_usuario'; // Cambia esto con el usuario logueado

  constructor(
    private fb: FormBuilder,
    private dbService: DbserviceService
  ) {
    this.userForm = this.fb.group({
      usuario: [''],
      edad: [''],
      altura: [''],
      peso: [''],
      email: ['']
    });
  }

  ngOnInit() {
    this.loadUserData(this.usuario);
  }

  private loadUserData(usuario: string) {
    this.dbService.obtenerDatos(usuario).subscribe(
      userData => {
        if (userData) {
          this.userForm.patchValue({
            usuario: userData.usuario,
            edad: userData.edad,
            altura: userData.altura,
            peso: userData.peso,
            email: userData.email
          });
        }
      },
      error => {
        console.error('Error al cargar los datos del usuario:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }

  public saveUserData() {
    const userData = this.userForm.value;
    this.dbService.updateUser(
      userData.usuario,
      userData.edad,
      userData.altura,
      userData.peso,
      userData.email
    ).subscribe(
      () => {
        // Operación completada con éxito
      },
      error => {
        console.error('Error al guardar los datos del usuario:', error);
        // Puedes manejar el error aquí, por ejemplo, mostrar un mensaje al usuario
      }
    );
  }
}
