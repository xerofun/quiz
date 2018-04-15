import { Component, OnInit } from '@angular/core';
import { GameSettingsService } from '../game-settings.service';
import { Operator, AdditionOperator, SubtractionOperator, MultiplicationOperator, DivisionOperator } from '../operator';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.sass']
})
export class SettingsComponent implements OnInit {
  constructor(private gameSettingsService: GameSettingsService) { }

  ngOnInit() {
  }

  setOperator(operator: Operator) {
    this.gameSettingsService.updateOperator(operator);
  }
}
