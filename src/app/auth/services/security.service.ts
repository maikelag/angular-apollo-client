import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecurityService {

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post('http://127.0.0.1:3000/login', {username, password})
      .pipe(map((user: any) => {
        if (user) {
          console.log(user);
          localStorage.setItem('id_token', user.id_token);
        }
      }));
  }

  logout() {
    localStorage.removeItem('id_token');
  }

}
