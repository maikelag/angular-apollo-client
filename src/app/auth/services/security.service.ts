import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { environment } from '@env/environment';

const API_BASE = environment.api_server;

@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  constructor(private http: HttpClient) {}

  login(userDTO: any): Observable<any> {
    return this.http
      .post('http://127.0.0.1:3000/users/login', {
        username: userDTO.username,
        password: userDTO.password
      })
      .pipe(
        map((user: any) => {
          if (user) {
            localStorage.setItem('id_token', user.token);
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('id_token');
  }

  whoIAm(): Observable<any> {
    return this.http.get('http://127.0.0.1:3000/users/whoiam');
  }

  register(userDTO: any) {
    return this.http.post('http://127.0.0.1:3000/users', {
      username: userDTO.username,
      password: userDTO.password
    });
  }

  updateUser(userId, userDTO: any) {
    return this.http.put(`${API_BASE}/users/${userId}`, {
      username: userDTO.username,
      password: userDTO.password
    });
  }

  removeUser(userId: number): Observable<any> {
    return this.http.delete(`${API_BASE}/users/${userId}`);
  }

  updatePassword(userId: number, newPass: string, oldPass: string): Observable<any> {
    return this.http.patch(`${API_BASE}/users/${userId}`, {
      oldPass: oldPass,
      password: newPass
    });
  }

  findUsers(): Observable<any> {
    return this.http.get(`${API_BASE}/users`);
  }
}
