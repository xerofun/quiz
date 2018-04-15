import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatisticsService } from '../statistics.service';
import { Statistics } from '../statistics';
import { Question } from '../question';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.sass']
})
export class ResultsComponent implements OnInit {
  private gameStatistics: Statistics;

  constructor(
    private router: Router,
    private statisticsService: StatisticsService ) {
  }

  ngOnInit() {
    this.statisticsService.mostRecentStatisticsSubject$.subscribe(s => {
      console.log(`Emitted statistics ${s}`);
      this.gameStatistics = s;
    });
  }

  get numberQuestionsCorrect(): number {
    return this.gameStatistics.numberQuestionsCorrect;
  }

  get numberQuestionsIncorrect(): number {
    return this.gameStatistics.numberQuestionsIncorrect;
  }

  get numberQuestions(): number {
    return this.gameStatistics.numberQuestionsAsked;
  }

  get questionsCorrect(): Array<Question> {
    return this.gameStatistics.questionsCorrect;
  }

  get questionsIncorrect(): Array<Question> {
    return this.gameStatistics.questionsIncorrect;
  }

  gotoMenu() {
    this.router.navigateByUrl("");
  }
}
