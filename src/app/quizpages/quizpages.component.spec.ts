import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuizpagesComponent } from './quizpages.component';

describe('QuizpagesComponent', () => {
  let component: QuizpagesComponent;
  let fixture: ComponentFixture<QuizpagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuizpagesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizpagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
