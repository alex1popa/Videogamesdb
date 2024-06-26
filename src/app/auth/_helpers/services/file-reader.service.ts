import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { LogInPayload } from '../interfaces/login.payload';

@Injectable({
  providedIn: 'root'
})
export class FileReaderService {
  private configUrl = 'assets/credentials.json';
  private configSubject: BehaviorSubject<LogInPayload[]>;

  constructor(private http: HttpClient) {
    this.configSubject = new BehaviorSubject<LogInPayload[]>([]);
    this.loadConfig();
  }

  getConfig(): Observable<{ credentials: LogInPayload[] }> {
    return this.http.get<{ credentials: LogInPayload[] }>(this.configUrl);
  }

  private loadConfig(): void {
    this.http.get<LogInPayload[]>(this.configUrl).subscribe(
      (config) => {
        this.configSubject.next(config);
      },
      (error) => {
        console.error('Failed to load config', error);
      }
    );
  }

}
