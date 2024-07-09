import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { GEOLOCATION_TOKEN  } from 'src/app/mock-geolocation.service';


interface Tareas {
  nombre: string;
  completada: boolean;
}

@Component({
  selector: 'app-tab2',
  templateUrl: './tab2.page.html',
  styleUrls: ['./tab2.page.scss'],
})
export class Tab2Page implements OnInit {
  nuevaTarea: string='';
  tarea: Tareas[]=[];

  weatherData: any;
  private weatherApiUrl = 'https://api.openweathermap.org/data/2.5/weather'; // Cambia esto a la URL de tu API del clima
  private apiKey = '025a19dee82deb379fe3d37a5884600b'; // Reemplaza con tu clave de API


  constructor(private http: HttpClient,
    @Inject(GEOLOCATION_TOKEN) private geolocation: any
  ) { }

  async ngOnInit() {
    try {
      const position = await this.getCurrentPosition();
      this.getWeather(position.latitude, position.longitude);
    } catch (error) {
      console.error('Error obteniendo la geolocalización', error);
    }
  }

  async getCurrentPosition(): Promise<{ latitude: number, longitude: number }> {
    const coordinates = await this.geolocation.getCurrentPosition();
    return {
      latitude: coordinates.coords.latitude,
      longitude: coordinates.coords.longitude
    };
  }

  getWeather(latitude: number, longitude: number) {
    const url = `${this.weatherApiUrl}?lat=${latitude}&lon=${longitude}&appid=${this.apiKey}&units=metric`;
    this.http.get(url).subscribe(data => {
      this.weatherData = data;
      console.log(this.weatherData);
    }, error => {
      console.error('Error obteniendo los datos del clima', error);
    });
  }
}
