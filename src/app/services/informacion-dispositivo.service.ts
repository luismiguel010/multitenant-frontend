import { environment } from './../../environments/environment';
import { Observable, catchError, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DispositivoIoT } from '../models/dispositivosiot';

@Injectable({
  providedIn: 'root'
})
export class InformacionDispositivoService {

  constructor(protected http: HttpClient) { }

  obtenerInformacionDispositivo(nombreDispositivoIOT: string): Observable<DispositivoIoT[]> {
    return this.http.get<DispositivoIoT[]>(environment.url_backend + 'ConsultaControladorDispositivo/' + nombreDispositivoIOT).pipe(
      catchError(e => {
        return throwError(() => new Error('Error obteniendo datos del dispositivo'));
      })
    );
  }
}
