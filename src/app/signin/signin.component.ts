import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { User } from '../user.model';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  loginForm:FormGroup;
  logIn:boolean=false;
  constructor(private fb:FormBuilder,private route:Router, private http:HttpClient, private authService:AuthService) { }

  ngOnInit(): void {
    this.loginForm=this.fb.group({
      'email':new FormControl('',[Validators.required,Validators.email]),
      'pswrd':new FormControl('',[Validators.required])
    })
  }

  onSubmit(){
    if(this.loginForm.valid){
      this.http.get<any[]>('http://localhost:4500/users/')
      .subscribe(result=>{
        let userArr = result.filter(x=>{
          return x.email===this.loginForm.value.email && x.password===this.loginForm.value.pswrd
        })
        if(userArr.length==0){
          alert('incorrect credentials')
        }
        else{
            let user:User = {
              id:userArr[0].id ,
              email:userArr[0].email,
              name:userArr[0].name
            }

            this.authService.loggedIn(true, user)
            this.route.navigate(['quiz'])
        }
      }, err=>{
        console.log(err);
        
      })
    }
    }
  }

