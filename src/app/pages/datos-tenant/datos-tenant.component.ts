import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datos-tenant',
  templateUrl: './datos-tenant.component.html',
  styleUrls: ['./datos-tenant.component.css']
})
export class DatosTenantComponent implements OnInit {

  nombre_tenant = 'Luis Miguel Montes';
  correo_tenant = 'luis.montes@ceiba.com.co';
  nombre_dispositivo = 'Raspberry PI Tenant 1'

  constructor() { }

  ngOnInit(): void {
  }

}
