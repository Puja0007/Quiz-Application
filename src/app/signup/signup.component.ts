import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  registerForm:FormGroup;
  submitted:boolean=false;
  constructor(private fb: FormBuilder,private route:Router,private http: HttpClient) { }

  ngOnInit(): void {

    this.registerForm=this.fb.group({
      'fullname':new FormControl(null,Validators.required),
     'email':new FormControl(null,Validators.required),
     'psw':new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    
   })
  }
  onSubmit(){
    if(this.registerForm.valid){

      this.http.post<any>('http://localhost:4500/users/',
      {
        name: this.registerForm.value.fullname,
        email:this.registerForm.value.email,
        password:this.registerForm.value.psw
      })
      .subscribe(result=>{
        console.log(result);
        
        this.route.navigate(['signin'])
      }, err=>{
        console.log(err);
        
      })
    }
  }

}
