import { Injectable } from '@angular/core';
import { Question } from './question';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameService {
  private currentQuestion: Question = this.generateNewQuestion();
  private currentQuestionSubject = new BehaviorSubject<Question>(this.currentQuestion);
  
  currentQuestionSubject$ = this.currentQuestionSubject.asObservable();

  constructor() { }

  public answerQuestion(answer: number): boolean {
    const correct = answer === this.currentQuestion.operator(
      this.currentQuestion.leftOperand,
      this.currentQuestion.rightOperand
    );

    this.nextQuestion();

    return correct;
  }

  private generateNewQuestion(): Question {
    const question = new Question();
    question.leftOperand = Math.floor(Math.random() * 13);
    question.rightOperand = Math.floor(Math.random() * 13);
    question.operator = (a, b) => a + b;
    return question;
  }

  private nextQuestion(): void {
    this.currentQuestion = this.generateNewQuestion();
    this.currentQuestionSubject.next(this.currentQuestion);
  }
}
