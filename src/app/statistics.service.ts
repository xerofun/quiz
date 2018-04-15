import { Injectable } from '@angular/core';
import { Statistics } from './statistics';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

const STATISTICS_STORAGE_KEY = "statistics";

@Injectable()
export class StatisticsService {
  private statistics: Map<number, Statistics>;
  private mostRecentStatistics = {} as Statistics;
  private mostRecentStatisticsSubject = new BehaviorSubject<Statistics>(this.mostRecentStatistics);

  mostRecentStatisticsSubject$ = this.mostRecentStatisticsSubject.asObservable();

  constructor() {
    console.log("Constructing Statistics Service");
    const statistics = localStorage.getItem(STATISTICS_STORAGE_KEY);
    if (statistics) {
      console.log(`Loading statistics from local storage ${statistics}`)
      this.statistics = new Map<number, Statistics>(JSON.parse(statistics));
    } else {
      console.log(`Creating new statistics`);
      this.statistics = new Map<number, Statistics>();
      this.flushToDisk();
    }
  }

  recordGameStatistics(gameTimestamp: number, gameStatistics: Statistics): void {
    this.mostRecentStatistics = gameStatistics;
    this.mostRecentStatisticsSubject.next(this.mostRecentStatistics);
    this.statistics.set(gameTimestamp, gameStatistics);
    this.flushToDisk();
  }

  private flushToDisk() {
    localStorage.setItem(STATISTICS_STORAGE_KEY, JSON.stringify(Array.from(this.statistics.entries())));
  }
}
