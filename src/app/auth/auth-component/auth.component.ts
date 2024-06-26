import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LogInPayload } from '../_helpers/interfaces/login.payload';
import { AuthService } from '../_helpers/services/auth.service';
import { ConfigService } from '../_helpers/services/file-reader.service';
@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  rememberMe: boolean = false;
  email: string ='';
  password: string ='';
  userToken: string | null = '';

  loginEmail: string = '';
  loginPassword: string = '';



  constructor(
    private authService: AuthService,
    private router: Router, 
    private notificationService: NzNotificationService,
    private configService: ConfigService
  ) {}

  ngOnInit(): void {
    this.userToken = this.authService.getToken();
    this.loadConfig();
  }

  loadConfig(): void{
    this.configService.getConfig().subscribe(config => {
      this.loginEmail = config.email;
      this.loginPassword = config.password;
    });
  }

  onSuccessRequest(): void {
    const payload: LogInPayload = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    };
    this.authService.successLogIn(payload).subscribe((response: { token: string; }) => {
      console.log(response);
      this.authService.setToken(response.token);
      this.userToken = this.authService.getToken();
      sessionStorage.setItem('userToken', response.token);
      this.router.navigateByUrl('/table');
    });
  }

  onErrorRequest(): void {
    this.authService.errorLogIn({ email: 'peter@klaven' }).subscribe({
      next: (response: any) => {
        console.log(response);
      },
      error: (err: any) => {
        console.error(err);
        this.notificationService.error('Error', 'Something went wrong');
        this.userToken = null;
        this.authService.logOut();
      },
    });
  }

  onRememberMeRequest(): void {
    const payload: LogInPayload = {
      email: 'eve.holt@reqres.in',
      password: 'cityslicka',
    };
    this.authService.successLogIn(payload).subscribe({
      next: (response: { token: string; }) => {
        console.log(response);
        this.authService.setToken(response.token);
        this.userToken = this.authService.getToken();

        if (this.rememberMe) {
          localStorage.setItem('userToken', response.token);
        } else {
          sessionStorage.setItem('userToken', response.token);
        }

        this.router.navigateByUrl('/table');
      },
      error: (err: any) => {
        console.error(err);
      },
    });
  }

  onRequest(email: string, password: string): void {
    
    if (email === this.loginEmail && password === this.loginPassword) {
      this.onSuccessRequest();
    } else {
      this.onErrorRequest();
    }
  }
}
