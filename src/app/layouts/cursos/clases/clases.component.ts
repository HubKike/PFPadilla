import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Curso, User, Alumno } from '../../../models/interfaces';
import { ClasesServiciosService } from '../services/clases-servicios.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {

  constructor(private builder: FormBuilder, private _service: ClasesServiciosService, private _alert: ToastrService) { }

  masterInstructor!: User[];
  masterCurso!: Curso[];
  masterAlumno!: Alumno[];

  //Formulario
  rowsFormAlumnos!: FormArray<any>;
  rowAlumno!: FormGroup<any>;

  formularioClase = this.builder.group({
    cursoClave: this.builder.control('', Validators.required),
    cursoId: this.builder.control('', Validators.required),
    cursoNombre: this.builder.control(''),
    instructorId: this.builder.control('', Validators.required),
    instructor: this.builder.control(''),
    alumnos: this.builder.array([])
  });

  ngOnInit(): void {
    this.getInstructores();
    this.getCursos();
    this.getAlumnos();
  }

  // addnewproduct
  agregarAlumno() {
    this.rowsFormAlumnos = this.formularioClase.get("alumnos") as FormArray;

    let claveCurso = this.formularioClase.get("cursoId")?.value
    let claveInstructor = this.formularioClase.get("instructorId")?.value

    if (claveCurso != null && claveCurso != '' && claveInstructor != null && claveInstructor != '') {
      this.rowsFormAlumnos.push(this.insertarFila());
    } else {
      this._alert.warning('Campos Instructor y Curso son obligatorios', 'Validación');
    }

  }

  // get invproducts(){}
  get listaAlumnos() {
    return this.formularioClase.get("alumnos") as FormArray;
  }

  // Generaterow()
  insertarFila() {
    return this.builder.group({
      cursoClave: this.builder.control(''),
      alumnoId: this.builder.control('', Validators.required),

      alumnoNombre: this.builder.control({ value: '', disabled: true }),
      alumnoApellido: this.builder.control({ value: '', disabled: true }),

      // alumnoNombre: this.builder.control(''),
      // alumnoApellido: this.builder.control('')
    })
  }

  getInstructores() {
    this._service.getInstructores().subscribe(res => {
      this.masterInstructor = res;
    })
  }

  getCursos() {
    this._service.getCursos().subscribe(res => {
      this.masterCurso = res;
    })
  }

  getAlumnos() {
    this._service.getAlumnos().subscribe(res => {
      this.masterAlumno = res;
    })
  }

  // customerchange(){}
  //alCambiarCurso() { }

  //alCambiarInstructor() { }

  cambiarAlumno(index: number) {
    this.rowsFormAlumnos = this.formularioClase.get("alumnos") as FormArray;
    this.rowAlumno = this.rowsFormAlumnos.at(index) as FormGroup;
    let claveAlumno = +this.rowAlumno.get("alumnoId")?.value;
    console.log('claveAlumno', claveAlumno);
    this._service.getAlumnoId(claveAlumno).subscribe(res => {
      let datosAlumno: any;
      datosAlumno = res;
      if (datosAlumno != null) {
        //this.rowAlumno.get("alumnoNombre")?.setValue(datosAlumno.firstname + ', ' + datosAlumno.lastname);
        this.rowAlumno.get("alumnoNombre")?.setValue(res?.firstname);
        this.rowAlumno.get("alumnoApellido")?.setValue(res?.lastname);
      }
    })
  }

  // SaveInvoice(){}
  guardarCurso() {
    if (this.formularioClase.valid) {
    } else {
      this._alert.warning('Ingrese los campos obligatorios', 'Validación');
    }
  }

}