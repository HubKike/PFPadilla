import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CursosService } from '../service/cursos.service';

@Component({
  selector: 'app-dialogo',
  templateUrl: './dialogo.component.html',
  styleUrls: ['./dialogo.component.scss']
})
export class DialogoComponent implements OnInit {

  levelList = ["Básico", "Intermedio", "Avanzado"];
  courseForm!: FormGroup;
  actionBtn: string = "Save";

  constructor(private formBuilder: FormBuilder,
    private api: CursosService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogoComponent>) { }

  ngOnInit(): void {
    this.courseForm = this.formBuilder.group({
      courseName:   ['', Validators.required],
      category:     ['', Validators.required],
      level:        ['', Validators.required],
      price:        ['', Validators.required],
      description:  ['', Validators.required]
    });

    if (this.editData) {
      this.actionBtn = "Update";
      this.courseForm.controls['courseName'].setValue(this.editData.courseName);
      this.courseForm.controls['category'].setValue(this.editData.category);
      this.courseForm.controls['level'].setValue(this.editData.level);
      this.courseForm.controls['price'].setValue(this.editData.price);
      this.courseForm.controls['description'].setValue(this.editData.description);
    }
  }

  addCourse() {
    if (!this.editData) {
      if (this.courseForm.valid) {
        this.api.postCourse(this.courseForm.value)
          .subscribe({
            next: (res) => {
              alert("Course added successfully")
              this.courseForm.reset();
              this.dialogRef.close('save');
            },
            error: () => {
              alert("Error while adding the course")
            }
          })
      }
    } else {
      this.updateProduct()
    }
  }

  updateProduct() {
    this.api.putCourse(this.courseForm.value, this.editData.id)
      .subscribe({
        next: (res) => {
          alert("Course updated Successfully");
          this.courseForm.reset();
          this.dialogRef.close('update')
        },
        error: () => {
          alert("Error durante la actualización del servicio")
        }
      })
  }

}
