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

  // GetAllInvoice() { }
  getClases() {
    return this._http.get('http://localhost:3000/clases').pipe(
      map((response: any) => {
        //return response.clases.map((curso: any) => {
        return response.map((curso: any) => {
          return {
            id: curso.id,
            cursoClave: curso.cursoClave,
            instructorId: curso.instructorId,
            instructor: curso.instructor,
            cursoId: curso.cursoId,
            cursoNombre: curso.cursoNombre
          };
        });
      })
    );
  }

  getClase(id: number) {
    return this._http.get('http://localhost:3000/clases').pipe(
      map((response: any) => {
        const filteredClases = response.filter((clase: { id: number; cursoClave: string; instructorId: string; instructor: string; cursoId: string; cursoNombre: string; alumnos: Array<any>; }) => clase.id === id);
        const clase = filteredClases[0];
        // const alumnos = clase.alumnos.map((alumno: any) => {
        //   return {
        //     alumnoId: alumno.alumnoId,
        //     cursoClave: alumno.cursoClave,
        //     alumnoNombre: alumno.alumnoNombre,
        //     alumnoApellido: alumno.alumnoApellido
        //   };
        // });
        return {
          id: clase.id,
          cursoClave: clase.cursoClave,
          instructorId: clase.instructorId,
          instructor: clase.instructor,
          cursoId: clase.cursoId,
          cursoNombre: clase.cursoNombre
          // , alumnos: alumnos
        };
      })
    );
  }

  getClaseAsistencia(id: number) {
    return this._http.get('http://localhost:3000/clases').pipe(
      map((response: any) => {
        const clase = response.find((clase: any) => clase.id === id);
        if (clase) {
          return clase.alumnos.map((alumno: any) => {
            return {
              alumnoId: alumno.alumnoId,
              cursoClave: alumno.cursoClave,
              alumnoNombre: alumno.alumnoApellido,
              alumnoApellido: alumno.alumnoApellido
            }
          });
        } else {
          throw new Error(`No se encontró ninguna clase con el id ${id}`);
        }
      })
    );
}

  // GetInvDetailbyCode() { }
  getlistaAlumnos(cursoClave: any) {
    return this._http.get(`http://localhost:3000/clases/${cursoClave}/alumnos`).pipe(
      map((response: any) => {
        return response.details.map((alumno: any) => {
          return {
            cursoClave: response.cursoClave,
            alumnoId: alumno.alumnoId,
            alumnoNombre: alumno.alumnoNombre,
            alumnoApellido: alumno.alumnoApellido
          };
        });
      })
    );
  }

  // RemoveInvoice(invoice: any) { }
  borrarClase(id: number) {
    //return this._http.delete(`http://localhost:3000/clases?id=${id}`)
    return this._http.delete(`http://localhost:3000/clases/${id}`)
      .pipe(
        map((response: any) => {
          if (!response.error) {
            return "pass";
          } else {
            throw new Error(response.error);
          }
        })
      );
  }

  // SaveInvoice(invoicedata: any) { }
  guardarClase(data: any) {
    return this._http.post("http://localhost:3000/clases/", data)
      .pipe(
        map((response: any) => {
          if (!response.error) {
            return "pass";
          } else {
            throw new Error(response.error);
          }
        })
      );
  }

  actualizarClase(id: number, data: any) {
    return this._http.put(`http://localhost:3000/clases/${id}`, data).pipe(
      map((response: any) => {
        if (!response.error) {
          return "pass";
        } else {
          throw new Error(response.error);
        }
      })
    );
  }

}