import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Game } from '../models/game';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {

  private jsonUrl = 'assets/games.json';
  private games: Game[] = [];

  constructor(private http: HttpClient) { }

  getGames(): Observable<Game[]> {
    if (this.games.length) {
      return of(this.games);
    } else {
      return this.http.get<Game[]>(this.jsonUrl).pipe(
        tap(data => this.games = data)
      );
    }
  }

  deleteGame(name: string): Observable<Game[]> {
    this.games = this.games.filter(game => game.name !== name);
    return of(this.games);
  }
}
