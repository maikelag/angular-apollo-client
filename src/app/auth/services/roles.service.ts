import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { HttpClient } from '@angular/common/http';
import { Permission } from '../models/permission.model';
import { Observable } from 'rxjs';
import { Role } from '../models/role.model';

const API_BASE = environment.api_server;

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  constructor(private http: HttpClient) {}

  findRoles(): Observable<any> {
    return this.http.get(`${API_BASE}/roles`);
  }

  findOneRole(idRole: number): Observable<any> {
    return this.http.get(`${API_BASE}/roles/${idRole}`);
  }

  createRole(roleNew: Role): Observable<any> {
    return this.http.post(`${API_BASE}/roles`, roleNew);
  }

  removeRole(idRole: number): Observable<any> {
    return this.http.delete(`${API_BASE}/roles/${idRole}`);
  }

  findPermissions(): Observable<any> {
    return this.http.get(`${API_BASE}/permissions`);
  }
}
