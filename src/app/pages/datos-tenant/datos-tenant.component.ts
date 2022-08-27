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

  constructor(private route: ActivatedRoute, protected informacionTenantService: InformacionTenantService) { }

  ngOnInit(): void {
    let idTenant = this.route.snapshot.paramMap.get('id')!;
    this.informacionTenantService.obtenerTenant(idTenant)
      .subscribe({
        complete: () => { },
        error: () => { Swal.fire('Error', 'Error al obtener la información del tenant', 'error') },
        next: (response: Tenant) => { this.tenant = response }
      });
  }

}
