import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  private maxTime = 6;
  private leftOperand: number;
  private rightOperand: number;
  private answer: number;

  private lastQuestionCorrect = "";
  private questionsCorrect = 0;
  private questionsAsked = 0;
  private timeRemaining = this.maxTime;

  private inProgress = false;
  private timerSubscription: Subscription;

  private incorrectProblems = new Array<string>();

  constructor(private router: Router) { }

  ngOnInit() {
    this.generateNewQuestion();
    this.startTimer();
  } 

  answerQuestion() {
    this.questionsAsked++;
    if (this.leftOperand + this.rightOperand == this.answer) {
      this.lastQuestionCorrect = "Correct";
      this.questionsCorrect++;
    } else {
      this.lastQuestionCorrect = "Incorrect";
      this.incorrectProblems.push(this.leftOperand + "+" + this.rightOperand + "=" + this.answer);
    }

    this.answer = null;
    this.generateNewQuestion();
  }

  generateNewQuestion() {
    this.leftOperand = Math.floor(Math.random() * 13);
    this.rightOperand = Math.floor(Math.random() * 13);
  }

  startTimer() {
    if (!this.inProgress) {
      this.inProgress = true;
      this.timerSubscription = timer(0, 1000)
        .subscribe(val => {
          if (val >= this.maxTime) {
            this.timerSubscription.unsubscribe();
            this.inProgress = false;
          }
          this.timeRemaining = this.maxTime - val;
        });
    }
  }

  viewResults() {
    this.router.navigateByUrl("/results");
  }
}
