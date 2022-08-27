import { environment } from './../../environments/environment';
import { Tenant } from '../models/tenant';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RegistroTenantsService {

  constructor(protected http: HttpClient, private router: Router) { }

  crearTenant(tenant: Tenant): Observable<string> {
    return this.http.post<string>(environment.url_backend + 'ComandoControladorTenant', tenant);
  }
}
