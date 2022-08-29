import { environment } from './../../environments/environment';
import { Tenant } from '../models/tenant';
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroTenantsService {

  constructor(protected http: HttpClient, private router: Router) { }

  private createHeader(contentType: string): any {
    return { headers: new HttpHeaders({ 'Content-Type': contentType }), responseType: 'text', };
  }

  async crearTenant(tenant: Tenant): Promise<HttpEvent<string>> {
    return await firstValueFrom(this.http.post<string>(environment.url_backend + 'ComandoControladorTenant', tenant, this.createHeader('application/json')))
  }
}
