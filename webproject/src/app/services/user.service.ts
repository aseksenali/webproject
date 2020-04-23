import { Injectable } from '@angular/core';
import {User} from '../models/user';
import {Book} from '../models/book';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User;
  constructor(private httpClient: HttpClient) {
    this.httpClient.get<User>('api/user').subscribe(user => this.user = user);
  }

  addBookForUser(book: Book): void {
    this.user.books.concat(book);
  }
}
