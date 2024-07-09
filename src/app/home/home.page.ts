import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NavController } from '@ionic/angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  animations:[
    trigger('entrada',[
      state('void', style({
        transform: 'translateX(-100%)',
        opacity: 0
      })),
      transition(':enter',[
        animate(1000, style({
          transform: 'translateX(0)',
          opacity:1
        }))
      ])
    ])
  ]
})
export class HomePage {

  usuario: string='';
  password:string='';

  usuarioPersistente:any='';

  constructor(private router:Router, private activaterouter:ActivatedRoute, private alertController:AlertController, private navController: NavController) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation && navigation.extras && navigation.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
      this.password = navigation.extras.state['password'];

      localStorage.setItem('usuarioPersistente', this.usuario)
      localStorage.setItem('sesion_activa','SI')
      }
    }

  ngOnInit(){
    this.usuarioPersistente=localStorage.getItem("usuarioPersistente");
  }  

  formulario(){
    this.navController.navigateRoot('/formulario');
  }

  cerrar() {
    localStorage.clear();
    this.router.navigate(['']);
  }

  }


