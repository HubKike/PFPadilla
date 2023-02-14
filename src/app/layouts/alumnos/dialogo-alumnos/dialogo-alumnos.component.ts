import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { AlumnosService } from '../service/alumnos.service';

@Component({
  selector: 'app-dialogo-alumnos',
  templateUrl: './dialogo-alumnos.component.html',
  styleUrls: ['./dialogo-alumnos.component.scss']
})
export class DialogoAlumnosComponent implements OnInit {

  genderList = ['masculino', 'femenino'];
  statusList = [false, true];
  alumnosForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: AlumnosService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogoAlumnosComponent>) { }

  ngOnInit(): void {
    this.alumnosForm = this.formBuilder.group({
      firstname:  this.formBuilder.control('', [Validators.required]),
      lastname:   this.formBuilder.control('', [Validators.required]),
      email:      this.formBuilder.control('', [Validators.required, Validators.email]),
      gender:     this.formBuilder.control('masculino'),
      isactive:   this.formBuilder.control(false)
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.alumnosForm.controls['firstname'].setValue(this.editData.firstname);
      this.alumnosForm.controls['lastname'].setValue(this.editData.lastname);
      this.alumnosForm.controls['email'].setValue(this.editData.email);
      this.alumnosForm.controls['gender'].setValue(this.editData.gender);
      this.alumnosForm.controls['isactive'].setValue(this.editData.isactive);
    }
  }

  agregarAlumno() {
    if (!this.editData) {
      if (this.alumnosForm.valid) {
        this.api.postAlumnos(this.alumnosForm.value)
          .subscribe({
            next: (res) => {
              alert("Alumno registrado con éxito")
              this.alumnosForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error al registrar el curso")
            }
          })
      }
    } else {
      this.updateProduct()
    }
  }

  updateProduct() {
    this.api.putAlumnos(this.alumnosForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Course updated Successfully");
          this.alumnosForm.reset();
          this.dialogRef.close('update')
        },
        error: () => {
          alert("Error durante la actualización del registro")
        }
      })
  }

}