export interface Operator {
    name: string,
    func: (a: number, b: number) => number;
    symbol: string; 
}

export class AdditionOperator implements Operator {
    name = "Addition";
    func = (a, b) => a + b;
    symbol = "+";
}

export class SubtractionOperator implements Operator {
    name = "Subtraction";
    func = (a, b) => a - b;
    symbol = "-";
}

export class MultiplicationOperator implements Operator {
    name = "Multiplication";
    func = (a, b) => a * b;
    symbol = "*";
}

export class DivisionOperator implements Operator {
    name = "Division";
    func = (a, b) => a / b;
    symbol = "/";
}