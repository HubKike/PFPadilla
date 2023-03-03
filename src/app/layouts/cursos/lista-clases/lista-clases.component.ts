import { Component, OnInit } from '@angular/core';
import { ClasesServiciosService } from '../services/clases-servicios.service';
//import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.scss']
})
export class ListaClasesComponent implements OnInit {

  constructor(private _service: ClasesServiciosService, private _alert: ToastrService, private _router: Router) { }

  ngOnInit(): void {
    this.obtenerClases()
  }

  // Invoiceheader!: any;
  encabezadoClase!: any;

  //LoadInvoice() { }
  obtenerClases() {
    this._service.getClases().subscribe(res => {
      this.encabezadoClase = res;
    })
  }

  editarClase(id: number) {
    this._router.navigateByUrl('/editarclase/' + id);
  }

  borrarClase(id: number) {
    this._service.borrarClase(id).subscribe(respose => {
      let result: any;
      result = respose;
      if (String(result) === 'pass') {
        this._alert.success('Curso eliminado', 'curso: ' + result.result);
        this.obtenerClases();
      } else {
        this._alert.error('Error al eliminar el curso', 'Cursos');
      }
    })
  }

}