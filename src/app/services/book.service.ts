import {EventEmitter, Injectable, Output} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Book} from '../models/book';
import {from, Observable, of} from 'rxjs';
import {buffer, filter, flatMap, mergeAll, toArray} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private httpClient: HttpClient) { }

  private bookUrl = 'api/books';

  getAllBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.bookUrl);
  }

  getBook(id: number): Observable<Book> {
    const url = `${this.bookUrl}/${id}`;
    return this.httpClient.get<Book>(url);
  }

  getGenres():Observable<string[]> {
    const result: Set<string> = new Set<string>();
    return this.getAllBooks().pipe(flatMap(books => {
      return from(books).pipe(flatMap(book => from(book.genre).pipe(filter(genre => {
        if (!result.has(genre)) {
          result.add(genre);
          return true;
        }
        return false;
      }))))
    }), toArray());
  }
  updateBook(book: Book):Observable<Book> {
    return this.httpClient.put<Book>(this.bookUrl, book, this.httpOptions);
  }
  searchBook(name: string): Observable<Book[]> {
    if (!name.trim()) {
      return of([]);
    }
    return this.httpClient.get<Book[]>(`${this.bookUrl}/?name=${name}`);
  }
}
