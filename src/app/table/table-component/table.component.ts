import { Component } from '@angular/core';
import { Game } from '../_helpers/models/game';
import { GameService } from '../_helpers/services/game.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {

  games: Game[] = [];
  constructor(private gameService: GameService) { }
  ngOnInit(): void {
    this.gameService.getGames().subscribe(data => {
      this.games = data;
    });
  }
}
