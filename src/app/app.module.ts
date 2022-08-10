import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistroComponent } from './pages/registro/registro.component';
import { FormularioComponent } from './pages/registro/formulario/formulario.component';
import { DatosTenantComponent } from './pages/datos-tenant/datos-tenant.component';
import { HeaderComponent } from './header/header/header.component';

const routes: Routes = [
  { path: '', redirectTo: '/registro', pathMatch: 'full' },
  { path: 'registro', component: RegistroComponent },
  { path: 'datos', component: DatosTenantComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegistroComponent,
    FormularioComponent,
    DatosTenantComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
