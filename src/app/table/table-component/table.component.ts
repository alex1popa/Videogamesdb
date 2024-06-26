import { Component, OnInit } from '@angular/core';
import { Game } from '../_helpers/models/game';
import { GameService } from '../_helpers/services/game.service';
import { NzTableSortOrder } from 'ng-zorro-antd/table';

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
  sortKey: string | null = null;
  sortValue: NzTableSortOrder | null = null;

  constructor(private gameService: GameService) { }

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

  onSort(sort: { key: string; value: NzTableSortOrder }): void {
    this.sortKey = sort.key;
    this.sortValue = sort.value;
    this.sortData();
    this.updateDisplayData();
  }

  sortData(): void {
    if (this.sortKey && this.sortValue) {
      this.games = [...this.games].sort((a, b) => {
        const valA = a[this.sortKey as keyof Game];
        const valB = b[this.sortKey as keyof Game];
        return this.sortValue === 'ascend' 
          ? valA > valB ? 1 : valA < valB ? -1 : 0 
          : valB > valA ? 1 : valB < valA ? -1 : 0;
      });
    }
  }

  updateDisplayData(): void {
    const startIndex = (this.pageIndex - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.displayData = this.games.slice(startIndex, endIndex);
  }
}
