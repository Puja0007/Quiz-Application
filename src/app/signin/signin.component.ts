import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { User } from '../model/user.model';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../model/login.model';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent implements OnInit {
  loginForm: FormGroup;
  logIn: boolean = false;
  constructor(
    private fb: FormBuilder,
    private route: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      pswrd: new FormControl('', [Validators.required]),
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.http
        .post<LoginResponse>(`${environment.baseUrl}/auth/login`, {
          email: this.loginForm.value.email,
          password: this.loginForm.value.pswrd,
        })
        .subscribe(
          (result) => {
            const { email, _id, name } = result;
            const user: User = {
              email,
              id: _id,
              name,
            };
            this.authService.loggedIn(true, result);
            this.route.navigate(['quiz']);
          },
          (err) => {
            console.log(err);
          }
        );
    }
  }
}
