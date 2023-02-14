import { Component, DoCheck } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements DoCheck {
  title = 'PFPadilla';
  ismenurequired = false;
  isadminuser = false;
  constructor(private _router: Router, private _service: AuthService) { }

  ngDoCheck(): void {
    let currenturl = this._router.url;

    if (currenturl == '/login' || currenturl == '/register') {
      this.ismenurequired = false;
    } else {
      this.ismenurequired = true;
    }

    if (this._service.GetUserRole() === 'admin') {
      this.isadminuser = true;
    }else{
      this.isadminuser = false;
    }
  }

}