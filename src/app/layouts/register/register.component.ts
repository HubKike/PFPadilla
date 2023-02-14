import { Component }                from '@angular/core';
import { FormBuilder, Validators }  from '@angular/forms';
import { Router }                   from '@angular/router';
import { AuthService }              from '../../services/auth.service';
import { ToastrService }            from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  constructor(private builder: FormBuilder, private toastr: ToastrService,
              private service: AuthService, private router: Router) {}

  registerform = this.builder.group({
    //id:       this.builder.control('', Validators.compose([Validators.required, Validators.minLength(5)])),
    name:     this.builder.control('', Validators.required),
    password: this.builder.control('', Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])),
    email:    this.builder.control('', Validators.compose([Validators.required, Validators.email])),
    gender:   this.builder.control('male'),
    role:     this.builder.control(''),
    isactive: this.builder.control(false)
  });

  proceedregister() {
    if(this.registerform.valid){
      this.service.ProceedRegisterUser(this.registerform.value).subscribe(res => {
        this.toastr.success('Contacte al administrador para autorizar su acceso', 'Registro OK!');
        this.router.navigate(['login']);
      });
    }else{
      this.toastr.warning('Ingrese datos válidos')
    }
  }

}