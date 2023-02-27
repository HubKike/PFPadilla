import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  constructor(private http: HttpClient) { }

  postAlumnos(data: any) {
    return this.http.post<any>("http://localhost:3000/alumnos/", data);
  }

  getAlumnos() {
    return this.http.get<any>("http://localhost:3000/alumnos/");
  }

  putAlumnos(data: any, id: number) {
    return this.http.put<any>("http://localhost:3000/alumnos/" + id, data);
  }

  deleteAlumno(id: number) {
    return this.http.delete<any>("http://localhost:3000/alumnos/" + id);
  }  

}