import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Question } from '../model/quiz.model';
import { UserResponse } from './user-response.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-quizpages',
  templateUrl: './quizpages.component.html',
  styleUrls: ['./quizpages.component.css']
})
export class QuizpagesComponent implements OnInit {
  qid:number =0
  ansSet:boolean = false
  correct:boolean = false
  wrong:boolean = false
  current_score:number = 0
  visited={}
  current_Question:Question
  all_Questions:Question[]
  numberOfQuestions:number
  userResponse:UserResponse
  displayLoader:boolean = true
  
  @ViewChild('option') options:ElementRef
  constructor(private http: HttpClient, private authService:AuthService,private route:Router) { }
  displayResult(){
    this.userResponse = {
      
      name:this.authService.currentUser.name,
      score:this.current_score,
      userId:this.authService.currentUser.id,
    }
    
    this.http.post<any>(`${environment.baseUrl}/user-response/`, this.userResponse)
    .subscribe(result=>{
      this.authService.currUserResponse ={
        name:result.name,
        score:result.score,
        userId:result["user-id"],
        id:result.id
      }

      this.route.navigate(['result'])
    },err=>{
      console.log(err);
      
    })
    
  }
  resetAll(){
    this.ansSet = false
    this.correct = false
    this.wrong = false
  }
  getQuestions(){
    this.displayLoader =true
    let idx = Math.floor(Math.random() * this.numberOfQuestions);
    if(this.qid===this.numberOfQuestions){
      this.displayResult()
      return
    }
    while(this.visited[idx] ){
      idx = Math.floor(Math.random() * this.numberOfQuestions);
    }
    this.visited[idx] = 1
    this.qid+= 1
    this.current_Question = this.all_Questions[idx]
    
    this.displayLoader = false
    this.resetAll()
  }
  ngOnInit(): void {
    this.http.get<Question[]>(`${environment.baseUrl}/question/`)
    .subscribe(result=>{
      
    this.all_Questions=result;
    this.numberOfQuestions = result.length
    this.getQuestions()
    
    },
    (err)=>{
      console.log(err);
    })
  }
  onItemChange(value:string){
    Array.from(this.options.nativeElement.children).forEach((element:HTMLDivElement)=>{
      if(element.children[1].innerHTML.trim()===value.trim() && value=== this.current_Question.correctAnswer){

        element.children[1].classList.add('correct-option')
      }
      else if(element.children[1].innerHTML.trim()===value.trim() && value!== this.current_Question.correctAnswer){

        element.children[1].classList.add('wrong-option')
      }
    })
    if(value=== this.current_Question.correctAnswer && !this.ansSet){

      this.correct = true
      this.current_score += 1
      Array.from(this.options.nativeElement.children).forEach((element:HTMLDivElement)=>{
        if(element.children[1].innerHTML.trim()===value.trim())
        element.children[1].classList.add('correct-option')
      })
      setTimeout(()=>{
        this.getQuestions()
      },1500)
    }
    else if(!this.ansSet){
      this.wrong = true
      Array.from(this.options.nativeElement.children).forEach((element:HTMLDivElement)=>{
        
        if(element.children[1].innerHTML.trim()===value.trim())
        element.children[1].classList.add('wrong-option')

        else if(element.children[1].innerHTML.trim()===this.current_Question.correctAnswer){
          element.children[1].classList.add('correct-option')
        }
      })
      setTimeout(()=>{
        this.getQuestions()
      },1500)
    }
    this.ansSet = true
    
  }
}


