import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GameService } from '../game.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(private router: Router, private gameService: GameService) { }

  ngOnInit() {
  }

  newGame() {
    this.gameService.startGame();
    this.router.navigateByUrl("/game");
  }
}
