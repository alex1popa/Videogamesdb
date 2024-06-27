import { Component, OnInit } from '@angular/core';
import { Game } from '../_helpers/models/game';
import { GameService } from '../_helpers/services/game.service';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  games: Game[] = [];
  displayData: Game[] = [];
  pageSize = 5;
  pageIndex = 1;
  isVisible = false;
  selectedGame: Game | null = null;

  constructor(private gameService: GameService, private modal: NzModalService) { }

  ngOnInit(): void {
    this.gameService.getGames().subscribe(data => {
      this.games = data;
      this.updateDisplayData();
    });
  }

  onPageIndexChange(pageIndex: number): void {
    this.pageIndex = pageIndex;
    this.updateDisplayData();
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.games.slice(startIndex, endIndex);
  }

  deleteGame(name: string): void {
    this.gameService.deleteGame(name).subscribe(data => {
      this.games = data;
      this.updateDisplayData();
    });
  }

  showGameInfo(game: Game): void {
    this.selectedGame = game;
    console.log(game.releaseYear);
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }
}
