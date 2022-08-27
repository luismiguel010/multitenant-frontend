import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Tenant } from '../models/tenant';

@Injectable({
  providedIn: 'root'
})
export class InformacionTenantService {

  constructor(protected http: HttpClient) { }

  obtenerTenant(id: string): Observable<Tenant> {
    return this.http.get<Tenant>(environment.url_backend + 'ConsultaControladorTenant/' + id);
  }
}
