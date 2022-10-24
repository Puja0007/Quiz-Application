import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
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
    this.http.get<UserResponse[]>(`${environment.baseUrl}/result`)
    .subscribe(results=>{
      this.results = results.sort((a:UserResponse,b:UserResponse)=>{
        return b.score-a.score
      }).slice(0,10)

    })
  }

}
