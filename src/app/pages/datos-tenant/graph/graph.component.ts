import { DispositivoIoT } from '../../../models/dispositivosiot';
import { InformacionDispositivoService } from './../../../services/informacion-dispositivo.service';
import { Component, EventEmitter, Injectable, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTitleSubtitle,
  ApexStroke,
  ApexGrid
} from "ng-apexcharts";
import Swal from 'sweetalert2';

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  dataLabels: ApexDataLabels;
  grid: ApexGrid;
  stroke: ApexStroke;
  title: ApexTitleSubtitle;
};

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class GraphComponent implements OnInit {
  @Output() public humedadPromedioToParent = new EventEmitter<number>();
  @Output() public temperaturaPromedioToParent = new EventEmitter<number>();
  @ViewChild("chart") chart: ChartComponent;
  public chartOptionsTemperature: Partial<ChartOptions> | any;
  public chartOptionsHumidity: Partial<ChartOptions> | any;
  numeroDeDatosAMostrar: number = 10
  dispositivosIoT: DispositivoIoT[];
  tiempoDeMuestra: string[] = [];
  temperaturas: number[] = [];
  humedades: number[] = [];
  humedadPromedio: number;
  temperaturaPromedio: number;

  constructor(private route: ActivatedRoute, protected informacionDispositivoIoT: InformacionDispositivoService) { }

  public sendHumedadToParent(humedadPromedio: number) {
    this.humedadPromedioToParent.emit(humedadPromedio);
  }

  public sendTemperaturaToParent(temperaturaPromedio: number) {
    this.temperaturaPromedioToParent.emit(temperaturaPromedio);
  }

  ngOnInit(): void {
    let idTenant = this.route.snapshot.paramMap.get('id')!;
    this.informacionDispositivoIoT.obtenerInformacionDispositivo(idTenant)
      .subscribe({
        error: () => { Swal.fire('Error', 'Error al obtener la información del dispositivo', 'error') },
        next: (response) => {
          this.dispositivosIoT = response;
          for (var dispositivoIoT of this.dispositivosIoT) {
            var date = new Date(dispositivoIoT.eventProcessedUtcTime).toTimeString().replace(/.*(\d{2}:\d{2}:\d{2}).*/, "$1");
            this.tiempoDeMuestra.push(date);
            this.temperaturas.push(parseInt(dispositivoIoT.temperature.toFixed(2)));
            this.humedades.push(parseInt(dispositivoIoT.humidity.toFixed(2)))
          }
          this.humedadPromedio = this.calcularPromedio(this.humedades);
          this.sendHumedadToParent(this.humedadPromedio);
          this.temperaturaPromedio = this.calcularPromedio(this.temperaturas);
          this.sendTemperaturaToParent(this.temperaturaPromedio);
          this.graph_temperature(this.tiempoDeMuestra, this.temperaturas);
          this.graph_humidity(this.tiempoDeMuestra, this.humedades);
        }
      });
  }

  graph_humidity(tiempoDeMuestra: string[], humidity: number[]) {
    this.chartOptionsTemperature = {
      series: [
        {
          name: "Humedad",
          data: humidity.slice(-this.numeroDeDatosAMostrar)
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Sensor de humedad",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: tiempoDeMuestra.slice(-this.numeroDeDatosAMostrar)
      }
    };
  }

  graph_temperature(tiempoDeMuestra: string[], temperaturas: number[]) {
    this.chartOptionsHumidity = {
      series: [
        {
          name: "Temperatua °C",
          data: temperaturas.slice(-this.numeroDeDatosAMostrar)
        }
      ],
      chart: {
        height: 350,
        type: "line",
        zoom: {
          enabled: false
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: "straight"
      },
      title: {
        text: "Sensor de temperatura",
        align: "left"
      },
      grid: {
        row: {
          colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
          opacity: 0.5
        }
      },
      xaxis: {
        categories: tiempoDeMuestra.slice(-this.numeroDeDatosAMostrar)
      }
    };

  }

  calcularPromedio(listNumber: number[]): number {
    listNumber = listNumber.slice(-this.numeroDeDatosAMostrar)
    return listNumber.reduce((partialSum, a) => partialSum + a, 0) / this.numeroDeDatosAMostrar;
  }
}
