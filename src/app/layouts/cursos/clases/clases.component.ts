import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

import { Curso, User, Alumno } from '../../../models/interfaces';
import { ClasesServiciosService } from '../services/clases-servicios.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {    

  constructor(private builder: FormBuilder, private _service: ClasesServiciosService) { }

  masterInstructor!: any;
  masterCurso!: any;
  masterAlumno!: any;

  //Formulario
  rowAlumnos!: FormArray<any>;

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
    this.rowAlumnos = this.formularioClase.get("alumnos") as FormArray;
    this.rowAlumnos.push(this.insertarFila());
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
      alumnoApellido: this.builder.control({ value: '', disabled: true })

      // alumnoNombre: this.builder.control(''),
      // alumnoApellido: this.builder.control('')
    })
  }
  
  getInstructores(){
    this._service.getInstructores().subscribe(res => {
      this.masterInstructor = res;
    })
  }

  getCursos(){
    this._service.getCursos().subscribe(res => {
      this.masterCurso = res;
    })
  }

  getAlumnos(){
    this._service.getAlumnos().subscribe(res =>{
      this.masterAlumno = res;
    })
  }

  // customerchange(){}
  alCambiarCurso() { }

  alCambiarInstructor() { }

  // SaveInvoice(){}
  guardarCurso() {
    console.log(this.formularioClase.value);
  }

}