export class Question {
    leftOperand: number;
    rightOperand: number;
    operator: (left: number, right: number) => number;
}