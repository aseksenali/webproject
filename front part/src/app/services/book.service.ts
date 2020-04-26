import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../models/book';
import {from, Observable} from 'rxjs';
import {Genre} from '../models/genre';
import {filter, flatMap, toArray} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private httpClient: HttpClient) {
  }

  private bookUrl = 'http://localhost:8000/api/books/';

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.bookUrl);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.bookUrl}${id}`;
    return this.httpClient.get<Book>(url);
  }

  getGenres(): Observable<Genre[]> {
    const result: Set<string> = new Set<string>();
    return this.getAllBooks().pipe(flatMap(books => {
      return from(books).pipe(flatMap(book => from(book.genres).pipe(filter(genre => {
        if (!result.has(genre.name.toUpperCase())) {
          result.add(genre.name.toUpperCase());
          return true;
        }
        return false;
      }))))
    }), toArray());
  }

  updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.bookUrl}${book.id}`, book, this.httpOptions);
  }

  createBook(book: Book): Observable<Book> {
    return this.httpClient.post<Book>(this.bookUrl, book, this.httpOptions);
  }

  deleteBook(book: Book): Observable<Book> {
    return this.httpClient.delete<Book>(`${this.bookUrl}${book.id}`, this.httpOptions);
  }
}
