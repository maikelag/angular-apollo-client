import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AllMaterialModule } from '../material.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer } from './state/auth.reducers';
import { AuthEffect } from './state/auth.effects';
import { RoleComponent } from './role/role.component';
import { RoleService } from './services/roles.service';
import { RoleFormComponent } from './role/role-form/role-form.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { SecurityService } from './services/security.service';

@NgModule({
  declarations: [ UserComponent, LoginComponent, RoleComponent, RoleFormComponent, UserFormComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AllMaterialModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffect]),
  ],
  providers: [RoleService, SecurityService],
  entryComponents: [RoleFormComponent, UserFormComponent]
})
export class AuthModule { }
