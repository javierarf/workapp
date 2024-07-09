import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  formulario!: FormGroup;
  usuario:any="";
  password:any="";
  edad:any="";
  altura:any="";
  peso:any="";
  email:any="";

  isDBReady: boolean = false;

  constructor(private formbuilder: FormBuilder , private router:Router, private alertController:AlertController, private dbservice:DbserviceService) { }

  ngOnInit() {
    this.formulario = this.formbuilder.group({
      usuario: ['', Validators.required],
      edad: ['',Validators.required],
      altura: ['',Validators.required],
      peso: ['',Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    });

    this.dbservice.getIsDBReady().subscribe(isReady => {
      this.isDBReady = isReady;
      if (isReady) {
        // Aquí puedes llamar a funciones para cargar datos, etc. desde la base de datos
      }
    });
  }

  onSubmit() {
    if (this.formulario.valid) {
      console.log('Form Submitted', this.formulario.value);
    } else {
      console.log('Form not valid');
    }
  }

  login(){
    if (this.usuario.trim() === '' || this.password.trim() === '') {
      this.presentAlert('Error: nombre y apellido vacios');
    } else {
      this.guardaDatos();  
    } 
  }

  guardaDatos() {
    this.dbservice.insertUsuario(this.usuario, this.password, this.edad, this.altura, this.peso, this.email)
      .subscribe(() => {
        this.presentAlert('Datos guardados exitosamente');
        this.router.navigate(['/tabs/home']);
      },
      (error: any) => {
        this.presentAlert('Error al guardar datos:'+ error);
      });
  }


  async presentAlert(mensaje:string){
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: mensaje, 
      buttons: ['OK']
    });
    await alert.present();
  }
}
