import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit {


  currentTime: string='';
  alarmTime: string='';
  alarmSet: boolean=false;

  constructor( private router:Router, private alertController:AlertController) { }

  ngOnInit() {
    this.updateTime();
  }
 
  updateTime(){
    setInterval(()=>{
      const date = new Date();
      this.currentTime = date.toLocaleTimeString(); //GUARDA HORA ACTUAL
      if (this.alarmSet && this.checkAlarm(date)){
        this.triggerAlarm();
      }
    }, 1000);
  }

  setAlarm(time: string){
    this.alarmTime = time; //GUARDA LA ALARMA
    this.alarmSet= true;
  }

  checkAlarm(date: Date):boolean {
    const currentHour = date.getHours(); //OBTIENE HORA
    const currentMinute = date.getMinutes(); //OBTIENE MINUTOS
    const [alarmHour, alarmMinute] = this.alarmTime.split(':').map(Number); //LE DA FORMATO

    return currentHour === alarmHour && currentMinute === alarmMinute;//RETONA LA ALARMA ESTABLECIDA
  }

  async triggerAlarm(){
    const alert = await this.alertController.create({//ALERTA DE QUE ACABÓ EL TIEMPO
      header: 'Alarm',
      message: 'El tiempo acabó',
      buttons: ['OK']
    });
    await alert.present();
    this.alarmSet = false; //RESETEA LA ALARMA
  }

}
