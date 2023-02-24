import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User, Role } from '../models/interfaces';

import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _sesion: any = {
    estatus: false,
    usuario: '',
    rol: ''
  }


  constructor(private http: HttpClient) { }

  apiurl = 'http://localhost:3000/users';

  //Referencia
  // export interface Product {
  //   createdAt:   Date;
  //   name:        string;
  //   description: string;
  //   id:          string;
  // }

  // loadProducts() {
  //   this.httpClient.get<Product[]>(`${this.baseUrl}/products`)
  //     .subscribe((apiProducts) => {
  //       this.products.next(apiProducts)
  //     })
  // }

  GetAllUsers() {
    return this.http.get<User[]>(this.apiurl);
  }

  GetUserByCode(id: number) {
    return this.http.get<User>(this.apiurl + '/' + id);
  }

  GetUserByEmailPassword(email: string, password: string) {
    return this.http.get<User[]>(`${this.apiurl}?email=${email}&password=${password}`).pipe(
      map((usuarios: User[]) => {
        return usuarios.filter(u => u.email === email && u.password === password)
      })
    )
  }

  UpdateUser(id: any, inputdata: any) {
    return this.http.put(this.apiurl + '/' + id, inputdata);
  }

  GetAllRole() {
    return this.http.get<Role[]>('http://localhost:3000/roles');
  }


  ProceedRegisterUser(inputdata: any) {
    return this.http.post(this.apiurl, inputdata)
  }

  establecerSesion(estatus: boolean, usuario: string, rol: string) {
    this._sesion = { estatus, usuario, rol };
    localStorage.setItem("sesion", JSON.stringify(this._sesion));
  }

  IsloggedIn() {

    let sesion = JSON.parse(localStorage.getItem("sesion") || '{}');

    if (sesion.estatus) {
      return true;
    } else {
      return false;
    }

    // console.log('SesionStorage', sessionStorage.getItem('sesion') != null)
    // return sessionStorage.getItem('sesion') != null;
  }

  GetUserRole(): string {
    let sesion = JSON.parse(localStorage.getItem("sesion") || '{}');
    if (sesion.rol !== undefined && sesion.rol.length > 0) {
      return sesion.rol;
    } else {
      return '';
    }
  }

}