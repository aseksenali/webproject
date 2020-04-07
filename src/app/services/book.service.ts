import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Book} from '../models/book';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  constructor(private httpClient: HttpClient) { }

  private bookUrl = 'api/books';

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.bookUrl);
  }
  getGenres():Set<string> {
    const result: Set<string> = new Set<string>();
    this.getAllBooks().subscribe(books => {
      for (const book of books)
        for (const genre of book.genre)
          result.add(genre);
    });
    return result;
  }
}
