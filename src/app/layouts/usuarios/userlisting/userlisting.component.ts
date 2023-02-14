import { Component, ViewChild } from '@angular/core';
import { User } from '../../../models/interfaces';
import { AuthService } from '../../../services/auth.service';

import { UpdatepopupComponent } from '../updatepopup/updatepopup.component'

import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-userlisting',
  templateUrl: './userlisting.component.html',
  styleUrls: ['./userlisting.component.scss']
})
export class UserlistingComponent {

  //   export interface User {
  //     name: string;
  //     password: string;
  //     email: string;
  //     gender: string;
  //     role: string;
  //     isactive: boolean;
  //     id: number;
  // }

  listUsers!: User[];
  dataSource!: MatTableDataSource<User>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name', 'email', 'status', 'role', 'action'];

  constructor(private _service: AuthService, private dialog: MatDialog) {
    this.Loaduser();
  }

  Loaduser() {
    this._service.GetAllUsers().subscribe(res => {
      this.listUsers = res;
      this.dataSource = new MatTableDataSource(this.listUsers);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  //Asegurarse que sea por id de usuario
  UpdateUser(id: number) {
    const popup = this.dialog.open(UpdatepopupComponent,{
      enterAnimationDuration: '1000ms',
      exitAnimationDuration: '500ms',
      width:'50%',
      data:{
        id: id
      }
    })
    popup.afterClosed().subscribe((res)=>{
      this.Loaduser();
    })
  }

  openDialog(){}

}