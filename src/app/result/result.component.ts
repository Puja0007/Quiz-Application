import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { UserResponse } from '../quizpages/user-response.model';

@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.css']
})
export class ResultComponent implements OnInit {
  results:UserResponse[]
  currUserResonse:UserResponse
  constructor(private authService:AuthService, private http:HttpClient) { }

  ngOnInit(): void {
    this.currUserResonse= this.authService.currUserResponse
    this.http.get<UserResponse[]>('http://localhost:4500/user-response')
    .subscribe(results=>{
      this.results = results.sort((a:UserResponse,b:UserResponse)=>{
        return b.score-a.score
      }).slice(0,10)

    })
  }

}
