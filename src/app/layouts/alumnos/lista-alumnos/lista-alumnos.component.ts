import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DialogoAlumnosComponent } from '../dialogo-alumnos/dialogo-alumnos.component'

import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { AlumnosService } from '../service/alumnos.service';

@Component({
  selector: 'app-lista-alumnos',
  templateUrl: './lista-alumnos.component.html',
  styleUrls: ['./lista-alumnos.component.scss']
})
export class ListaAlumnosComponent implements OnInit {

  displayedColumns: string[] = ['firstname', 'lastname', 'email', 'gender', 'isactive', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: AlumnosService) { }

  ngOnInit(): void {
    this.getAllAlumnos();
  }

  openDialog() {
    this.dialog.open(DialogoAlumnosComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllAlumnos();
      }
    })
  }

  getAllAlumnos() {
    this.api.getAlumnos()
      .subscribe({
        next: (res) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          alert("Error while fetching the Records!!")
        }
      })
  }

  editAlumno(row: any) {
    this.dialog.open(DialogoAlumnosComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllAlumnos();
      }
    })
  }

  deleteAlumno(id: number) {
    this.api.deleteAlumno(id)
      .subscribe({
        next: (res) => {
          alert("Course deleted successfully");
          this.getAllAlumnos();
        },
        error: () => {
          alert("Error durante el borrado del alumno")
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}