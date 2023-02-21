import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {

  detalleAlumnos!: FormArray<any>;

  constructor(private builder: FormBuilder) { }

  formularioClase = this.builder.group({
    cursoClave: this.builder.control('', Validators.required),
    cursoId: this.builder.control('', Validators.required),
    cursoNombre: this.builder.control(''),
    instructorId: this.builder.control('', Validators.required),
    instructor: this.builder.control(''),
    alumnos: this.builder.array([])
  });

  ngOnInit(): void {
  }

  // addnewproduct
  agregarAlumno() {
    this.detalleAlumnos = this.formularioClase.get("alumnos") as FormArray;
    this.detalleAlumnos.push(this.insertarFila());
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

  

  // customerchange(){}
  alCambiarCurso() { }

  alCambiarInstructor() { }

  // SaveInvoice(){}
  guardarCurso() {
    console.log(this.formularioClase.value);
  }

}