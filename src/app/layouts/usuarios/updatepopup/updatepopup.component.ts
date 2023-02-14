import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Role, User } from '../../../models/interfaces';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-updatepopup',
  templateUrl: './updatepopup.component.html',
  styleUrls: ['./updatepopup.component.scss']
})
export class UpdatepopupComponent implements OnInit {

  rolelist!: Role[];

  constructor(private builder: FormBuilder, private _service: AuthService,
              @Inject(MAT_DIALOG_DATA) public data: User, private _toastr: ToastrService,
              private _dialog: MatDialogRef<UpdatepopupComponent>) { }

  editdata!: User

  ngOnInit(): void {
    this._service.GetAllRole().subscribe((list) => {
      this.rolelist = list;
    })
    if (this.data.id != null) {
      this._service.GetUserByCode(this.data.id).subscribe((res) => {
        this.editdata = res;
        this.registerform.setValue({
          id:this.editdata.id.toString(), name:this.editdata.name,
          password:this.editdata.password, email:this.editdata.email,
          role: this.editdata.role, gender: this.editdata.gender,
          isactive:this.editdata.isactive
        })
      });
    } else { }
  }

  registerform = this.builder.group({
    id:       this.builder.control(''),
    name:     this.builder.control(''),
    password: this.builder.control(''),
    email:    this.builder.control('',),
    gender:   this.builder.control('male'),
    role:     this.builder.control('', Validators.required),
    isactive: this.builder.control(false)
  });

  UpdateUser() {
    if(this.registerform.valid){
      this._service.UpdateUser(this.registerform.value.id, this.registerform.value).subscribe((res)=>{
        this._toastr.success('Actualizado exitósamente');
        this._dialog.close();
      })
    }else{
      this._toastr.warning('Seleccione el rol');
    }
  }

}