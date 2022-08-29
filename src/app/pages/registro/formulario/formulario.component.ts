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

  async crear() {
    await this.registroTenantsService.crearTenant(this.tenantForm.value)
      .then((response) => { Swal.fire('Registro exitoso', `${response}`, 'success') })
      .catch(() => { Swal.fire('Error', 'Es posible que el tenant ya exista', 'error') })
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
