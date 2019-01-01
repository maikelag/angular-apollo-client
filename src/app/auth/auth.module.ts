import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import { AuthRoutingModule } from './auth-routing.module';
import { UserComponent } from './user/user.component';
import { LoginComponent } from './login/login.component';
import { AllMaterialModule } from '../material.module';

@NgModule({
  declarations: [ UserComponent, LoginComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AllMaterialModule
  ]
})
export class AuthModule { }
