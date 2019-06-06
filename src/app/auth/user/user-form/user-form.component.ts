import { Component, OnInit, Inject } from '@angular/core';
import { User } from '@app/auth/models/user.model';
import { Role } from '@app/auth/models/role.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from '@app/auth/services/security.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { RoleService } from '@app/auth/services/roles.service';
import { plainToClass } from 'class-transformer';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  rolesList: Role[] = [];
  userForm: FormGroup;


  constructor(private userServices: SecurityService, private roleServices: RoleService,
    public dialogRefForm: MatDialogRef<UserFormComponent>,
    public userFB: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.loadRoles();
    this.initializeUserForm();
  }

  loadRoles() {
    this.roleServices.findRoles().subscribe(perm => {
      this.rolesList = perm;
    });
  }

  initializeUserForm() {
    this.userForm = this.userFB.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      roles: []
    });
  }

  sendUser() {
    const newUser = new User();
    const userNew = plainToClass(User, this.userForm.value as User);
    this.userServices.register(userNew).subscribe(userCreated => {
      this.onClose();
    });
  }

  sendRole2() {
    console.log(this.userForm.value);
  }

  onClose() {
    this.dialogRefForm.close();
  }

}
