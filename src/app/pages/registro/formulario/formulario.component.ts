import { Tenant } from '../../../models/tenant';
import { RegistroTenantsService } from './../../../services/registro-tenants.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.component.html',
  styleUrls: ['./formulario.component.css']
})
export class FormularioComponent implements OnInit {

  tenantForm: FormGroup;
  response_server: any;

  constructor(protected registroTenantsService: RegistroTenantsService) { }

  crear() {
    this.registroTenantsService.crearTenant(this.tenantForm.value)
      .subscribe({
        next: (response: string) => { Swal.fire('Creado exitosamente', `${response}`, 'success') },
        error: (response: string) => { Swal.fire('Error', `Error al crear tenant ${response}`, 'error') },
        complete: () => { },
      });
  }

  ngOnInit(): void {
    this.construirFormularioTenant();
  }

  private construirFormularioTenant() {
    this.tenantForm = new FormGroup({
      id: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      correo: new FormControl('', Validators.required),
      nombreDispositivoIOT: new FormControl('', Validators.required)
    });
  }



}
