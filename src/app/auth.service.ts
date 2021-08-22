import { Injectable } from '@angular/core';
import { UserResponse } from './quizpages/user-response.model';
import { User } from './user.model';
@Injectable({
    providedIn: 'root'
  })
  export class AuthService{
      isAuthenticated:boolean=false
      currentUser:User
      currUserResponse:UserResponse
      loggedIn(isAuth:boolean, currUser:User){
        this.isAuthenticated = isAuth
        this.currentUser = currUser
      }
      loggedOut(){
          this.isAuthenticated = false
          this.currentUser = undefined
      }
  }