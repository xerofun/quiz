import { Injectable } from '@angular/core';
import { Question } from './question';
import { Operator, AdditionOperator, SubtractionOperator, MultiplicationOperator, DivisionOperator } from './operator';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class GameSettingsService {
  operators: Array<Operator> = [
    new AdditionOperator(),
    new SubtractionOperator(),
    new MultiplicationOperator(),
    new DivisionOperator()
  ];

  private operator: Operator = this.operators[0];
  private operatorSubject = new BehaviorSubject<Operator>(this.operator);
  operatorSubject$ = this.operatorSubject.asObservable();

  constructor() {
  }

  updateOperator(operator: Operator) {
    this.operator = operator;
    this.operatorSubject.next(this.operator);
  }
}
