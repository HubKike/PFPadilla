import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { ListaAlumnosComponent } from './layouts/alumnos/lista-alumnos/lista-alumnos.component';
import { ClasesComponent } from './layouts/cursos/clases/clases.component';
import { ListaClasesComponent } from './layouts/cursos/lista-clases/lista-clases.component';
import { HomeComponent } from './layouts/home/home.component';
import { ListadoComponent } from './layouts/list-courses/listado/listado.component';
import { LoginComponent } from './layouts/login/login.component';
import { RegisterComponent } from './layouts/register/register.component';
import { UserlistingComponent } from './layouts/usuarios/userlisting/userlisting.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserlistingComponent, canActivate: [AuthGuard] },
  { path: 'cursos', component: ListadoComponent },
  { path: 'alumnos', component: ListaAlumnosComponent },
  { path: 'listaclases', component: ListaClasesComponent },
  { path: 'agregarclase', component: ClasesComponent },

  {component: ClasesComponent, path:"editarclase/:id"},

  { path: '**', redirectTo: 'login' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }