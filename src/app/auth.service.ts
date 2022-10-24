import { Injectable } from '@angular/core';
import { UserResponse } from './quizpages/user-response.model';
import { User } from './model/user.model';
import { LoginResponse } from './model/login.model';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated: boolean = false;
  private currentUser: User=null;
  currUserResponse: UserResponse;
  token: string = '';
  private authTimer = null;
  examDuration: number = 0;

  loggedIn(isAuth: boolean, loginResponse: LoginResponse) {
  
    const { email, _id, name, duration, token } = loginResponse;
    const currUser: User = {
      email,
      id: _id,
      name,
    };
    // console.log(currUser);
    this.token = token;
    this.isAuthenticated = isAuth;
    this.currentUser = currUser;
    this.examDuration = duration;
    this.authTimer = setTimeout(() => {
      this.loggedOut();
    }, duration*1000);
  }

getCurrentUser() : User{
    return {...this.currentUser};
}

  loggedOut() {
    this.isAuthenticated = false;
    this.currentUser = null;
    clearTimeout(this.authTimer);
  }
}
