import { Component, OnInit } from '@angular/core';
import { RoleService } from '../services/roles.service';
import { Role } from '../models/role.model';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig,
} from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { RoleFormComponent } from './role-form/role-form.component';
import { Permission } from '../models/permission.model';
import { findIndex } from 'lodash';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  rolesList: Role[];
  permissionsList: Permission[];
  displayedColumns: string[] = ['select', 'role'];

  dataSource = new MatTableDataSource<Role>(this.rolesList);
  selectionRoles = new SelectionModel<Role>(true, []);

  constructor(
    private roleServices: RoleService,
    private dialogRoleForm: MatDialog,
    private toastr: ToastrService
  ) {
    this.rolesList = [];
    this.permissionsList = [];
  }

  ngOnInit() {
    this.loadRole();
    this.loadPermissions();
    setTimeout(() => {
      this.selectionRoles.select(this.rolesList[2]);
    }, 2000);
  }

  loadRole() {
    this.roleServices.findRoles().subscribe(roles => {
      this.rolesList = roles;
      this.dataSource.data = this.rolesList;
    });
  }

  loadPermissions() {
    this.roleServices.findPermissions().subscribe(perm => {
      this.permissionsList = perm;
    });
  }

  selectedRoles() {
    return this.selectionRoles.selected.length;
  }

  isAllSelected() {
    const numSelected = this.selectionRoles.selected.length;
    const numRows = this.rolesList.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selectionRoles.clear()
      : this.dataSource.data.forEach(row => this.selectionRoles.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Role): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selectionRoles.isSelected(row) ? 'deselect' : 'select'
    } row ${findIndex(this.rolesList, row) + 1}`;
  }

  onCreate() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialogRoleForm
      .open(RoleFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.loadRole());
  }

  onEdit() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    dialogConfig.data = { roleSelected: this.selectionRoles.selected[0] };
    this.dialogRoleForm
      .open(RoleFormComponent, dialogConfig)
      .afterClosed()
      .subscribe(() => this.loadRole());
  }

  onDelete() {
    if (confirm('Are you sure to delete this record ?')) {
      this.selectionRoles.selected.forEach(el => {
        this.deleteRole(el.id);
      });
    }
  }

  deleteRole(id: number) {
    this.roleServices.removeRole(id).subscribe(roleDeleted => {
      this.toastr.success(
        roleDeleted.role,
        'Has eliminado correctamente el role: '
      );
      this.loadRole();
    });
  }
}
