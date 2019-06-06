import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from '../../services/roles.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  MatTableDataSource,
  MatDialog,
  MatDialogConfig
} from '@angular/material';
import { Permission } from '@app/auth/models/permission.model';
import { SelectionModel } from '@angular/cdk/collections';
import { findIndex } from 'lodash';
import { Role } from '@app/auth/models/role.model';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-role-form',
  templateUrl: './role-form.component.html',
  styleUrls: ['./role-form.component.css']
})
export class RoleFormComponent implements OnInit {
  permissionsList: Permission[] = [];
  permissionsSelected: Permission[] = [];
  roleForm: FormGroup;
  displayedColumns: string[] = ['selectPerm', 'permission'];

  dataSource = new MatTableDataSource<Permission>(this.permissionsList);
  selectionPerm = new SelectionModel<Permission>(true, []);

  constructor(
    private roleServices: RoleService,
    public dialogRefForm: MatDialogRef<RoleFormComponent>,
    public roleFB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    this.initializeRoleForm();
    this.loadPermissions();
    setTimeout(() => {
      this.selectionPerm.select(this.permissionsList[2]);
    }, 2000);
  }

  loadPermissions() {
    this.roleServices.findPermissions().subscribe(perm => {
      this.permissionsList = perm;
      this.dataSource.data = perm;
    });
  }

  initializeRoleForm() {
    this.roleForm = this.roleFB.group({
      role: ['', [Validators.required]]
    });
  }

  sendRole() {
    console.log('SendRole');
    const newRole = new Role();
    const roleNew = plainToClass(Role, this.roleForm.value as Role);
    newRole.permissions = this.selectionPerm.selected;
    this.roleServices.createRole(roleNew).subscribe(roleCreated => {
      this.onClose();
    });
  }

  cancelForm() {
    console.log('CancelForm');
    this.dialogRefForm.close();
  }

  isAllSelected() {
    const numSelected = this.selectionPerm.selected.length;
    const numRows = this.permissionsList.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selectionPerm.clear()
      : this.dataSource.data.forEach(row => this.selectionPerm.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Permission): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${
      this.selectionPerm.isSelected(row) ? 'deselect' : 'select'
    } row ${findIndex(this.permissionsList, row) + 1}`;
  }

  onClose() {
    this.dialogRefForm.close();
  }

  sendRole2() {}
}
