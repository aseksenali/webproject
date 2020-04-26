import { Injectable } from '@angular/core';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth = false;
  token: string;
  authUrl = 'http://localhost:8000/login/';

  constructor(private httpClient: HttpClient,
              private router: Router) {
  }

  login(username: string, password: string): void {
    const authInfo = {
      'username': username,
      'password': password
    };
    this.httpClient.post(this.authUrl, authInfo).subscribe(next => {
      if (next['token']) {
        this.token = next['token'];
        this.auth = true;
        this.router.navigateByUrl('/books');
      }
    });
  }

  logout(): void {
    this.token = '';
    this.auth = false;
    this.router.navigateByUrl('/login');
  }

  isAuthenticated(): boolean {
    return this.auth;
  }
}
