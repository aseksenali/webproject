import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BookService} from '../services/book.service';
import {FilterService} from '../services/filter.service';
import {from} from 'rxjs';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  genres: string[];
  selectedGenres = new Set<string>();
  genreCounter = 0;
  filterFields = [
    'price',
    'genre',
    'author',
    'year',
    'cover',
    'language'
  ];
  constructor(private bookService: BookService, private filterService: FilterService) { }

  ngOnInit(): void {
    this.bookService.getGenres().subscribe(genres => this.genres = genres.sort());
  }
  onGenreSelect(e): void {
    if (e.target.checked) {
      this.genreCounter += 1;
      this.selectedGenres.add(e.target.defaultValue);
    } else {
      this.genreCounter -= 1;
      this.selectedGenres.delete(e.target.defaultValue);
    }
    if (this.genreCounter !== 0) {
      this.filterService.onGenreFilter(Array.from(this.selectedGenres));
    } else {
      this.filterService.disableGenreFilter();
    }
  }
}
