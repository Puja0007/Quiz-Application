import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quizapp';

  constructor( private route: Router,
    public authService: AuthService){}

  logout(){
    this.authService.loggedOut();
    this.route.navigate(['signin'])
  }


}
