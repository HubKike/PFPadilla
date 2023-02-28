import { Component, OnInit } from '@angular/core';
import { ClasesServiciosService } from '../services/clases-servicios.service';
import { FormBuilder, Validators, FormGroup, FormArray } from '@angular/forms';

@Component({
  selector: 'app-lista-clases',
  templateUrl: './lista-clases.component.html',
  styleUrls: ['./lista-clases.component.scss']
})
export class ListaClasesComponent implements OnInit {

  constructor(private _service: ClasesServiciosService) { }

  ngOnInit(): void {
    this.obtenerClases()
  }

  // Invoiceheader!: any;
  encabezadoClase!: any;

  //LoadInvoice() { }
  obtenerClases() {
    this._service.getClases().subscribe(res => {
      console.log("obtenerClases", res)
      this.encabezadoClase = res;
    })
  }

}