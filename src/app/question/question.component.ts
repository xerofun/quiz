import { Component, OnInit, Input } from '@angular/core';
import { timer } from 'rxjs/observable/timer';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { GameService } from '../game.service';
import { Question } from '../question';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.sass']
})
export class QuestionComponent implements OnInit {
  private maxTime = 6;

  private question: Question;
  private answer: number;

  private lastQuestionCorrect = "";
  private questionsCorrect = 0;
  private questionsAsked = 0;
  private timeRemaining = this.maxTime;

  private inProgress = false;
  private timerSubscription: Subscription;

  constructor(private router: Router,
    private gameService: GameService) {
  }

  ngOnInit() {
    this.gameService.currentQuestionSubject$.subscribe(q => {
      this.question = q;
      this.startTimer();
    });

    this.gameService.gameStatisticsSubject$.subscribe(s => {
      this.questionsCorrect = s.questionsCorrect;
      this.questionsAsked = s.questionsAsked;
    });
  } 

  answerQuestion() {
    const correct = this.gameService.answerQuestion(this.answer);

    if (correct) {
      this.lastQuestionCorrect = "Correct";
    } else {
      this.lastQuestionCorrect = "Incorrect";
    }

    this.answer = null;
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
