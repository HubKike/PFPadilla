import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso, User, Alumno } from '../../../models/interfaces';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClasesServiciosService {

  constructor(private _http: HttpClient) { }

  urlCursos = 'http://localhost:3000/coursesList';
  urlUsers = 'http://localhost:3000/users';
  urlAlumnos = 'http://localhost:3000/alumnos';

  //Uno
  //GetCustomer(){}
  //GetCustomerbycode(){}

  getCursos() {
    return this._http.get<Curso[]>(this.urlCursos);
  }

  getCursoId(id: number) {
    return this._http.get<Curso[]>(`${this.urlCursos}?id=${id}`).pipe(
      map((cursos: Curso[]) => {
        //return cursos.filter(curso => curso.id === id)
        return cursos.find(curso => curso.id === id)
      })
    )
  }

  getInstructores() {
    return this._http.get<User[]>(`${this.urlUsers}?role=instructor`).pipe(
      map((users: User[]) => {
        return users.filter(user => user.role === 'instructor')
      })
    )
  }

  getInstuctorId(id: number) {
    return this._http.get<User[]>(`${this.urlUsers}?id=${id}&role=instructor`).pipe(
      map((users: User[]) => {
        //return users.filter(user => user.id === id)
        return users.find(user => user.id === id);
      })
    )
  }

  //Varios
  //GetProducts(){}
  //GetProductsbycode(){}
  getAlumnos() {
    return this._http.get<Alumno[]>(this.urlAlumnos)
  }

  getAlumnoId(id: number) {
    return this._http.get<Alumno[]>(`${this.urlAlumnos}?id=${id}`).pipe(
      map((alumnos: Alumno[]) => {
        //return alumnos.filter(alumno => alumno.id === id)
        return alumnos.find(alumno => alumno.id === id)
      })
    )
  }

}