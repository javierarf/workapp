import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { NavigationExtras, Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario: any="";
  password: string="";

  user:any="";
  email:any="";
  edad: any="";
  altura:any="";
  peso:any="";
  constructor(private alertController:AlertController, private router:Router, private dbservice:DbserviceService) { }

  ngOnInit() {
    localStorage
  }

  async login() {
    console.log('Logging in with:', this.usuario, this.password);
    const usuario = await this.dbservice.validarUsuario(this.usuario, this.password);
    if (usuario) {
      // Usuario válido, realizar acciones de inicio de sesión
      let NavigationExtras: NavigationExtras = {
        state:{
          usuario: this.usuario,
          password: this.password
        }
      };
      console.log('Navigating to /tabs/home with:', NavigationExtras);
      this.router.navigate(['/tabs/home'], NavigationExtras);
    } else {
      // Usuario inválido, mostrar mensaje de error
      this.presentAlert('Credenciales inválidas');
    }
  }

  registrar(){
    this.router.navigate(['/registro']);
  }

  async presentAlert(mensaje:string){
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje, 
      buttons: ['OK']
    });
    await alert.present();
  }
}
