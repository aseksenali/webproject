import {EventEmitter, Injectable, Output} from '@angular/core';
import {from, Observable} from 'rxjs';
import {Book} from '../models/book';
import {filter, flatMap, toArray} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private bookUrl = 'http://localhost:8000/api/books/';
  @Output() genreFilterIsDisabled: EventEmitter<void> = new EventEmitter();
  @Output() genreFilterIsActive: EventEmitter<string[]> = new EventEmitter<string[]>();
  onGenreFilter(genres: string[]): void {
    this.genreFilterIsActive.emit(genres);
    }
  disableGenreFilter(): void {
    this.genreFilterIsDisabled.emit();
  }
  constructor(private httpClient: HttpClient) { }
  filterByGenre(genres: string[]): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.bookUrl).pipe(flatMap(books => {
      return from(books).pipe(filter(book => {
        for (const selectedGenre of genres) {
          if (book.genres.map<string>((genre) => genre.name.toUpperCase()).includes(selectedGenre)) {
            return true;
          }
        }
        return false;
      }), toArray())
    }));
  }
}
