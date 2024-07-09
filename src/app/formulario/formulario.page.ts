import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { DbserviceService } from '../dbservice.service';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  nombre: any='';
  apellido: any='';
  selectedOption: any='';
  selectedDate: any='';

  isDBReady: boolean = false;

  constructor(private alertController:AlertController, private router:Router, private activaterouter:ActivatedRoute, private dbservice:DbserviceService) {
  }

  ngOnInit() {
    this.nombre = localStorage.getItem("nombre");
    this.apellido = localStorage.getItem("apellido");
    this.selectedOption = localStorage.getItem("selectedOption");
    this.selectedDate = localStorage.getItem("selectedDate");

    this.dbservice.getIsDBReady().subscribe(isReady => {
      this.isDBReady = isReady;
      if (isReady) {
      }
    });
  }
  mostrar() {
    if (this.nombre.trim() === '' || this.apellido.trim() === '') {
      this.presentAlert('Error: nombre y apellido vacios');
    } else {
      this.guardarDatos();
    }
  }

  guardarDatos() {
    this.dbservice.insertFormulario(this.nombre, this.apellido, this.selectedOption, this.selectedDate)
      .subscribe(() => {
        this.presentAlert('Datos guardados exitosamente');
      },
      (error: any) => {
        this.presentAlert('Error al guardar datos:'+ error);
      });
  }

  limpiar() {
    this.nombre = '';
    this.apellido = '';
    this.selectedOption = '';
    this.selectedDate = '';

    localStorage.clear();
  }

  async presentAlert(message: string) {
    const alert = await this.alertController.create({
      header: 'Mensaje',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  home(){
    this.router.navigate(['/tabs/home']);
  }
}
