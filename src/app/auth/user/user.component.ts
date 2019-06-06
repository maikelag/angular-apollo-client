import { Component, OnInit } from '@angular/core';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { Permission } from '../models/permission.model';
import { findIndex } from 'lodash';
import { ToastrService } from 'ngx-toastr';

import { SecurityService } from '../services/security.service';
import { User } from '../models/user.model';
import { Role } from '../models/role.model';
import { RoleService } from '../services/roles.service';
import { UserFormComponent } from './user-form/user-form.component'

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  usersList: User[] = [];
  rolesList: Role[] = [];

  displayedColumns: string[] = ['select', 'username'];
  dataSource = new MatTableDataSource<User>(this.usersList);
  selectionUsers = new SelectionModel<User>(true, []);

  constructor(
    private userServices: SecurityService,
    private roleServices: RoleService,
    private dialogRoleForm: MatDialog,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.loadRoles();
    this.loadUsers();
  }


  loadRoles() {
    this.roleServices.findRoles().subscribe(roles => {
      this.rolesList = roles;
    });
  }

  loadUsers() {
    this.userServices.findUsers().subscribe(users => {
      this.usersList = users;
    });
  }

  selectedUsers() {
    return this.selectionUsers.selected.length;
  }

  isAllSelected() {
    const numSelected = this.selectionUsers.selected.length;
    const numRows = this.usersList.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selectionUsers.clear()
      : this.dataSource.data.forEach(row => this.selectionUsers.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selectionUsers.isSelected(row) ? 'deselect' : 'select'
    } row ${findIndex(this.usersList, row) + 1}`;
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialogRoleForm
      .open(UserFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.loadUsers());
  }

  onEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { roleSelected: this.selectionUsers.selected[0] };
    this.dialogRoleForm
      .open(UserFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.loadUsers());
  }

  onDelete() {
    if (confirm('Are you sure to delete this record ?')) {
      this.selectionUsers.selected.forEach(el => {
        this.deleteUser(el.id);
      });
    }
  }

  deleteUser(id: number) {
    this.userServices.removeUser(id).subscribe(userDeleted => {
      this.toastr.success(
        userDeleted.role,
        'Has eliminado correctamente el role: '
      );
      this.loadUsers();
    });
  }
}
