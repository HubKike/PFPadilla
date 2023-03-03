import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

import { Curso, User, Alumno } from '../../../models/interfaces';
import { ClasesServiciosService } from '../services/clases-servicios.service';

import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss']
})
export class ClasesComponent implements OnInit {

  constructor(private builder: FormBuilder, private _service: ClasesServiciosService,
    private _alert: ToastrService, private _router: Router, private _activeroute: ActivatedRoute) { }

  titulopagina = 'Registro de cursos';
  masterInstructor!: User[];
  masterCurso!: Curso[];
  masterAlumno!: Alumno[];

  editarCurso: any;
  esedicion = false;
  asistenciaCurso: any;

  //Formulario
  rowsFormAlumnos!: FormArray<any>;
  rowAlumno!: FormGroup<any>;

  formularioClase = this.builder.group({
    id: this.builder.control(''),
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

    this.editarCurso = this._activeroute.snapshot.paramMap.get('id');
    if (this.editarCurso != null) {
      this.titulopagina = "Editar curso";
      this.esedicion = true;
      this.seteditcurso(Number(this.editarCurso));
    }
  }

  seteditcurso(id: number) {
    this._service.getClaseAsistencia(id).subscribe((asistencia: any) => {
      this.asistenciaCurso = asistencia;
      for (let i = 0; i < this.asistenciaCurso.length; i++) {
        this.agregarAlumno();
      }
    })

    this._service.getClase(id).subscribe((res: any) => {
      let datosEdicion: any;
      datosEdicion = res;
      if (datosEdicion != null) {
        this.formularioClase.setValue({
          id: datosEdicion.id,
          cursoClave: datosEdicion.cursoClave,
          cursoId: datosEdicion.cursoId,
          cursoNombre: datosEdicion.cursoNombre,
          instructorId: datosEdicion.instructorId,
          instructor: datosEdicion.instructor,
          alumnos: this.asistenciaCurso
        })
      }
    })
  }

  // addnewproduct
  agregarAlumno() {
    this.rowsFormAlumnos = this.formularioClase.get("alumnos") as FormArray;
    let claveCurso = this.formularioClase.get("cursoId")?.value;
    let claveInstructor = this.formularioClase.get("instructorId")?.value;
    if ((claveCurso != null && claveCurso != '' && claveInstructor != null && claveInstructor != '') || this.esedicion) {
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
      alumnoId: Number(this.builder.control('', Validators.required)),
      alumnoNombre: this.builder.control({ value: '', disabled: true }),
      alumnoApellido: this.builder.control({ value: '', disabled: true }),

      // alumnoNombre: this.builder.control(''),
      // alumnoApellido: this.builder.control(''),
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

  cambiarCurso() {
    let _sCursoClave = Number(this.formularioClase.get("cursoId")?.value);
    this._service.getCursoId(_sCursoClave).subscribe((curso: any) => {
      this.formularioClase.get("cursoNombre")?.setValue(curso.courseName);
    })
  }

  cambiarInstructor() {
    let _instructorclave = Number(this.formularioClase.get("instructorId")?.value);
    this._service.getInstuctorId(_instructorclave).subscribe((users: any) => {
      this.formularioClase.get("instructor")?.setValue(users.name);
    })
  }

  // customerchange(){}
  //alCambiarCurso() { }
  //alCambiarInstructor() { }
  cambiarAlumno(index: number): void {
    let _cursoclave = this.formularioClase.get("cursoClave")?.value;
    this.rowsFormAlumnos = this.formularioClase.get("alumnos") as FormArray;
    this.rowAlumno = this.rowsFormAlumnos.at(index) as FormGroup;
    let claveAlumno = +this.rowAlumno.get("alumnoId")?.value;
    this._service.getAlumnoId(claveAlumno).subscribe(res => {
      let datosAlumno: any;
      datosAlumno = res;
      if (datosAlumno != null) {
        //this.rowAlumno.get("alumnoNombre")?.setValue(datosAlumno.firstname + ', ' + datosAlumno.lastname);
        this.rowAlumno.get("cursoClave")?.setValue(_cursoclave);
        this.rowAlumno.get("alumnoNombre")?.setValue(res?.firstname);
        this.rowAlumno.get("alumnoApellido")?.setValue(res?.lastname);
      }
    })
  }

  borrarAlumno(id: number) {
    this.listaAlumnos.removeAt(id);
  }

  generateAlumnosArray(): any[] {
    const alumnosArr = [];
    const rawAlumnos = this.formularioClase.get('alumnos')?.getRawValue();
    for (let i = 0; i < rawAlumnos.length; i++) {
      const alumno = {
        cursoClave: this.formularioClase.get('cursoClave')?.value,
        alumnoId: Number(rawAlumnos[i].alumnoId),
        alumnoNombre: rawAlumnos[i].alumnoNombre,
        alumnoApellido: rawAlumnos[i].alumnoApellido
      };
      alumnosArr.push(alumno);
    }
    console.log("generateAlumnosArray", alumnosArr);
    return alumnosArr;
  }

  guardarCurso() {
    if (this.formularioClase.valid) {
      const claseData = {
        id: this.formularioClase.get('id')?.value,
        cursoClave: this.formularioClase.get('cursoClave')?.value,
        cursoId: this.formularioClase.get('cursoId')?.value,
        cursoNombre: this.formularioClase.get('cursoNombre')?.value,
        instructorId: this.formularioClase.get('instructorId')?.value,
        instructor: this.formularioClase.get('instructor')?.value,
        alumnos: this.generateAlumnosArray()
      };

      if (this.esedicion) {
        let _id = this.formularioClase.get('id')?.value;
        this._service.actualizarClase(Number(_id), claseData).subscribe(response => {
          let result: any;
          result = response;
          if (String(result) === 'pass') {
            this._alert.success('Curso actualizado', 'curso: ' + result.result);
            this._router.navigate(['/listaclases'])
          } else {
            this._alert.error('Error al actualizar el curso', 'Cursos');
          }
        })
      } else {
        if (this.formularioClase.valid) {
          this._service.guardarClase(claseData).subscribe((response) => {
            let result: any;
            result = response;
            if (String(result) === 'pass') {
              this._alert.success('Curso registrado', 'curso: ' + result.result);
              this._router.navigate(['/listaclases'])
            } else {
              this._alert.error('Error al guardar curso', 'Cursos');
            }
          });
        } else {
          this._alert.warning('Ingrese los campos obligatorios', 'Validación');
        }
      }
    }
  }
}