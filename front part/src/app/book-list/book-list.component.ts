import { Component, OnInit } from '@angular/core';
import {BookService} from '../services/book.service';
import {Book} from '../models/book';
import { Router } from '@angular/router';
import {FilterService} from '../services/filter.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books: Book[];
  constructor(private bookService: BookService, private filterService: FilterService, private router: Router) { }

  ngOnInit(): void {
      this.bookService.getAllBooks().subscribe(books => this.books = books);
      this.filterService.genreFilterIsActive.subscribe(genres => this.filterService.filterByGenre(genres).subscribe(books => this.books = books));
      this.filterService.genreFilterIsDisabled.subscribe(() => this.bookService.getAllBooks().subscribe(books => this.books = books));
  }

  createBook(): void {
      this.router.navigateByUrl('/books/create');
  }
}
