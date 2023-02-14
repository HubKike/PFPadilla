import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'

import { User } from '../../models/interfaces';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  constructor(private builder: FormBuilder, private toastr: ToastrService,
    private service: AuthService, private router: Router) {
    localStorage.clear();
  }

  user!: User[];

  ngOnInit(): void {
    //throw new Error('Method not implemented.');
    //this.loginform.reset();
  }

  result: any;

  loginform = this.builder.group({
    email: this.builder.control('ultrared808@gmail.com', Validators.compose([Validators.required, Validators.email])),
    password: this.builder.control('Test$1234', Validators.required)
  });

  proceedlogin() {
    if (this.loginform.valid) {
      this.service.GetUserByEmailPassword(this.loginform.value.email!, this.loginform.value.password!).subscribe((user) => {
        if (user.length === 1) {
          this.user = user;
          if (this.user[0].isactive === true && this.user[0].role.length > 0) {
            this.service.establecerSesion(true, this.user[0].name, this.user[0].role);
            this.router.navigate(['']);
          } else {
            this.toastr.warning('Por favor contacte al administrador', 'Usuario inactivo');
          }
        } else {
          this.toastr.error('Verifique su contraseña');
        }
      })
    } else {
      this.toastr.warning('Ingrese usuario y contraseña válidos')
    }
  }
}