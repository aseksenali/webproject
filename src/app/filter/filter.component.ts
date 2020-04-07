import { Component, OnInit } from '@angular/core';
import {BookService} from '../services/book.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit {
  genres: Set<string>;
  filterFields = [
    'price',
    'genre',
    'author',
    'year',
    'cover',
    'language'
  ];
  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.genres = this.bookService.getGenres();
  }

}
