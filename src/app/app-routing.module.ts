import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuardAdmin } from './auth.guard';
import { QuizpagesComponent } from './quizpages/quizpages.component';
import { ResultComponent } from './result/result.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';


const routes: Routes = [
  { 
    path: '', 
    pathMatch: 'full',
    redirectTo: 'signup'
    
    
   },
  
  {
    path:'signin',
    component:SigninComponent,
    
  },
  {
    path:'signup',
    component:SignupComponent
  },
  {
    path: 'quiz',
    component:QuizpagesComponent,
    canActivate:[AuthGuardAdmin]
  },
  {
    path:'result',
    component:ResultComponent,
    canActivate:[AuthGuardAdmin]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
