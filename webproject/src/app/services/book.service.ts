import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../models/book';
import {from, Observable} from 'rxjs';
import {filter, flatMap, toArray} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  private bookUrl = 'localhost:8800/api/books';
  private genresUrl = 'localhost:8800/api/genres';


  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.bookUrl);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.bookUrl}/${id}`;
    return this.httpClient.get<Book>(url);
  }

  getGenres():Observable<string[]> {
    return this.httpClient.get<string[]>(this.genresUrl);
  }
  updateBook(book: Book):Observable<Book> {
    return this.httpClient.put<Book>(this.bookUrl, book, this.httpOptions);
  }
}
