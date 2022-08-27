import { DispositivoIoT } from '../../../models/dispositivosiot';
import { InformacionDispositivoService } from './../../../services/informacion-dispositivo.service';
import { Component, OnInit, ViewChild } from '@angular/core';
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
export class GraphComponent implements OnInit {
  @ViewChild("chart") chart: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  numeroDeDatosAMostrar: number = 50
  dispositivosIoT: DispositivoIoT[];
  tiempoDeMuestra: Date[] = [];
  temperaturas: number[] = [];

  constructor(private route: ActivatedRoute, protected informacionDispositivoIoT: InformacionDispositivoService) { }

  ngOnInit(): void {
    let idTenant = this.route.snapshot.paramMap.get('id')!;
    this.informacionDispositivoIoT.obtenerInformacionDispositivo(idTenant)
      .subscribe({
        error: () => { Swal.fire('Error', 'Error al obtener la información del dispositivo', 'error') },
        next: (response) => {
          this.dispositivosIoT = response;
          for (var dispositivoIoT of this.dispositivosIoT) {
            this.tiempoDeMuestra.push(dispositivoIoT.eventProcessedUtcTime);
            this.temperaturas.push(parseInt(dispositivoIoT.temperature.toFixed(2)));
          }

          this.chartOptions = {
            series: [
              {
                name: "Temperatua °C",
                data: this.temperaturas.slice(-this.numeroDeDatosAMostrar)
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
              categories: this.temperaturas.slice(-this.numeroDeDatosAMostrar)
            }
          };
        }
      });
  }
}
