import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private configUrl = 'assets/credentials.json';

  constructor(private http: HttpClient) { }

  getConfig(): Observable<{ email: string, password: string }> {
    return this.http.get<{ email: string, password: string }>(this.configUrl);
  }
}