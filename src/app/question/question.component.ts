import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  private maxTime = 60;
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

  constructor() { }

  ngOnInit() {
    this.generateNewQuestion();
  }

  answerQuestion() {
    this.questionsAsked++;
    if (this.leftOperand + this.rightOperand == this.answer) {
      this.lastQuestionCorrect = "Correct";
      this.questionsCorrect++;
      console.log("Correct!");
    } else {
      console.log(this.answer + " is Incorrect");
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
      console.log(`starting timer`);
      this.inProgress = true;
      this.timerSubscription = timer(0, 1000)
        .subscribe(val => {
          console.log(`current time: ${val}`);
          if (val >= this.maxTime) {
            this.timerSubscription.unsubscribe();
            this.inProgress = false;
          }
          this.timeRemaining = this.maxTime - val;
        });
    }
  }
}
