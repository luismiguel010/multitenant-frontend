import { GraphComponent } from './graph/graph.component';
import { Tenant } from '../../models/tenant';
import { InformacionTenantService } from './../../services/informacion-tenant.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-tenant',
  templateUrl: './datos-tenant.component.html',
  styleUrls: ['./datos-tenant.component.css']
})
export class DatosTenantComponent implements OnInit {
  @Input() id: string;
  tenant: Tenant;
  humedadPromedio: number;
  temperaturaPromedio: number;
  color: string;
  nombreTenant: string;

  constructor(private route: ActivatedRoute, protected informacionTenantService: InformacionTenantService) { }

  ngOnInit(): void {
    let idTenant = this.route.snapshot.paramMap.get('id')!;
    this.informacionTenantService.obtenerTenant(idTenant)
      .subscribe({
        complete: () => { },
        error: () => { Swal.fire('Error', 'Error al obtener la información del tenant', 'error') },
        next: (response: Tenant) => {
          this.tenant = response;
          this.color = this.tenant.color
          this.nombreTenant = this.tenant.nombre + " " + this.tenant.apellido
        }
      });
  }

  public obtenerPromedioHumedad(humedadPromedio: number) {
    this.humedadPromedio = humedadPromedio;
  }

  public obtenerPromedioTemperatura(temperaturaPromedio: number) {
    this.temperaturaPromedio = temperaturaPromedio;
  }





}
