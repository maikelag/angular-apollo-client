import { Component, OnInit } from '@angular/core';
import { Observable, of} from 'rxjs';
import { map, delay} from 'rxjs/operators';
import * as authUtils from './auth/utils/auth-utils';
import { SecurityService} from './auth/services/security.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ SecurityService ]
})
export class AppComponent implements OnInit {
  title = 'Example NGRX';
  lista = of(['hola', 'que', 'tal', 'estas']);

  constructor(private securityService: SecurityService) {}

  ngOnInit() {
  }

  logout() {
    this.securityService.logout();
  }

  isLogout(): boolean {
    return authUtils.isLogout();
  }
}
