import { Injectable } from '@angular/core';
import { Question } from './question';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Statistics } from './statistics';
import { StatisticsService } from './statistics.service';
import { GameSettingsService } from './game-settings.service';
import { Operator } from './operator';

@Injectable()
export class GameService {
  private currentQuestion: Question = this.generateNewQuestion();
  private currentQuestionSubject = new BehaviorSubject<Question>(this.currentQuestion);
  currentQuestionSubject$ = this.currentQuestionSubject.asObservable();
  
  private gameStatistics = new Statistics();
  private gameStatisticsSubject = new BehaviorSubject<Statistics>(this.gameStatistics);
  gameStatisticsSubject$ = this.gameStatisticsSubject.asObservable();

  private operator: Operator;

  constructor(private statisticsService: StatisticsService, private gameSettingsService: GameSettingsService) {
    this.gameSettingsService.operatorSubject$.subscribe(o => {
      this.operator = o;
      this.nextQuestion();
    })
  }

  public answerQuestion(answer: number): boolean {
    const correct = answer === this.currentQuestion.operator.func(
      this.currentQuestion.leftOperand,
      this.currentQuestion.rightOperand
    );

    if (correct) {
      this.gameStatistics.questionsCorrect.push(this.currentQuestion)
    } else {
      this.gameStatistics.questionsIncorrect.push(this.currentQuestion);
    }

    this.nextQuestion();

    return correct;
  }

  public endGame() {
    this.statisticsService.recordGameStatistics(+new Date(), this.gameStatistics);
  }

  public startGame() {
    this.gameStatistics = new Statistics();
    this.gameStatisticsSubject.next(this.gameStatistics);
  }

  private generateNewQuestion(): Question {
    const question = new Question();
    question.leftOperand = Math.floor(Math.random() * 13);
    question.rightOperand = Math.floor(Math.random() * 13);
    question.operator = this.operator;
    return question;
  }

  private nextQuestion(): void {
    this.currentQuestion = this.generateNewQuestion();
    this.gameStatisticsSubject.next(this.gameStatistics);
    this.currentQuestionSubject.next(this.currentQuestion);
  }
}
