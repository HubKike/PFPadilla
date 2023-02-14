import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoComponent } from '../dialogo/dialogo.component';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { CursosService } from '../service/cursos.service';

@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit {

  title = 'AngularCrud';

  displayedColumns: string[] = ['courseName', 'category', 'level', 'price', 'description', 'action'];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private dialog: MatDialog, private api: CursosService) { }

  ngOnInit(): void {
    this.getAllCourses();
  }

  openDialog() {
    this.dialog.open(DialogoComponent, {
      width: '30%'
    }).afterClosed().subscribe(val => {
      if (val === 'save') {
        this.getAllCourses();
      }
    })
  }

  getAllCourses() {
    this.api.getCourses()
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

  editCourse(row: any) {
    this.dialog.open(DialogoComponent, {
      width: '30%',
      data: row
    }).afterClosed().subscribe(val => {
      if (val === 'update') {
        this.getAllCourses();
      }
    })
  }

  deleteCourse(id: number) {
    this.api.deleteCourse(id)
      .subscribe({
        next: (res) => {
          alert("Course deleted successfully");
          this.getAllCourses();
        },
        error: () => {
          alert("Error while deleting the course!!")
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