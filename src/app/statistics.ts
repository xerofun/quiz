import { Question } from "./question";

export class Statistics {
    questionsCorrect: Array<Question> = [];
    questionsIncorrect: Array<Question> = [];

    get numberQuestionsAsked(): number {
        return this.numberQuestionsCorrect + this.numberQuestionsIncorrect;
    }

    get numberQuestionsCorrect(): number {
        return this.questionsCorrect.length;
    }

    get numberQuestionsIncorrect(): number {
        return this.questionsIncorrect.length;
    }
}