import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { SecurityService } from '../services/security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [SecurityService]
})
export class LoginComponent implements OnInit {
  myForm: FormGroup;

  constructor(public fb: FormBuilder, private securityService: SecurityService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.createUserForm();
  }

  createUserForm() {
    this.myForm = this.fb.group({
      username2: ['', [Validators.required]],
      password2: ['', [Validators.required]],
    });
  }

  loginUser() {
    this.securityService.login(this.myForm.value.username2, this.myForm.value.password2).subscribe(
      user => {
        console.log(user);
        this.router.navigate(['/admin']);
      });
  }

}
