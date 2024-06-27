import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { LogInPayload } from '../_helpers/interfaces/login.payload';
import { AuthService } from '../_helpers/services/auth.service';
import { FileReaderService } from '../_helpers/services/file-reader.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  email: string = '';
  password: string = '';
  emailRegister: string = '';
  passwordRegister: string = '';
  passwordConfirmationRegister: string = '';
  firstNameRegister: string = '';
  lastNameRegister: string = '';

  userToken: string | null = '';
  credentials: LogInPayload[] = [];
  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NzNotificationService,
    private fileReaderService: FileReaderService
  ) { }

  ngOnInit(): void {
    this.userToken = this.authService.getToken();
    this.loadConfig();
  }

  loadConfig(): void {
    this.fileReaderService.getConfig().subscribe(config => {
      this.credentials = config.credentials;
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

  onRequest(email: string, password: string): void {
    const credential = this.credentials.find(
      cred => cred.email === email && cred.password === password
    );

    if (credential) {
      this.onSuccessRequest();
    } else {
      this.onErrorRequest();
    }
  }

  onRegister(): void {
    const nameVerifier = /^[a-zA-Z]{2,}$/;
    const emailVerifier = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const passwordVerifier = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,}$/;

    if (nameVerifier.test(this.firstNameRegister) && nameVerifier.test(this.lastNameRegister) &&
      emailVerifier.test(this.emailRegister) &&
      passwordVerifier.test(this.passwordRegister) && this.passwordRegister == this.passwordConfirmationRegister) {
      //console.log(this.credentials);


      let newlyRegisterd: LogInPayload = { "email": this.emailRegister, "password": this.passwordRegister };

      const credential = this.credentials.find(cred => cred.email === this.emailRegister);

      if (!credential) {
        this.credentials.push(newlyRegisterd);
        console.log("New account added");
      }

      this.emailRegister = '';
      this.passwordRegister = '';
      this.firstNameRegister = '';
      this.lastNameRegister = '';
      this.passwordConfirmationRegister = '';
    }
    else {
      if (!nameVerifier.test(this.firstNameRegister)) {
        console.log("Incorrect first name format");
      }

      if (!nameVerifier.test(this.lastNameRegister)) {
        console.log("Incorrect last  name format");
      }
      if (!emailVerifier.test(this.emailRegister)) {
        console.log("Incorrect email format");
      }
      if (!passwordVerifier.test(this.passwordRegister)) {
        console.log("Incorrect password format");
      }
    }

  }
}
