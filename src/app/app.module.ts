import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './layouts/login/login.component';
import { UpdatepopupComponent } from './layouts/usuarios/updatepopup/updatepopup.component';

import { HomeComponent } from './layouts/home/home.component';
import { UserlistingComponent } from './layouts/usuarios/userlisting/userlisting.component';
import { RegisterComponent } from './layouts/register/register.component';

// Angular Material module
import { MaterialModule } from './shared/material.module';

import { ToastrModule } from 'ngx-toastr';

import { DialogoComponent } from './layouts/list-courses/dialogo/dialogo.component';
import { ListadoComponent } from './layouts/list-courses/listado/listado.component';
import { ListaAlumnosComponent } from './layouts/alumnos/lista-alumnos/lista-alumnos.component';
import { DialogoAlumnosComponent } from './layouts/alumnos/dialogo-alumnos/dialogo-alumnos.component';
import { ListaClasesComponent } from './layouts/cursos/lista-clases/lista-clases.component';
import { ClasesComponent } from './layouts/cursos/clases/clases.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UpdatepopupComponent,
    HomeComponent,
    UserlistingComponent,
    RegisterComponent,
    DialogoComponent,
    ListadoComponent,
    ListaAlumnosComponent,
    DialogoAlumnosComponent,
    ListaClasesComponent,
    ClasesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    ToastrModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
