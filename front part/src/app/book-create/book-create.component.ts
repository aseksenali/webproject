import {Component, OnInit} from '@angular/core';
import {Book} from '../models/book';
import {CurrencyPipe} from '@angular/common';
import {BookService} from '../services/book.service';
import {Router} from '@angular/router';
import {Genre} from '../models/genre';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.css']
})
export class BookCreateComponent implements OnInit {
  book: Book;
  displayRating: number;
  fullRating: number;
  halfRating: number;
  formattedAmount: string;

  constructor(private currencyPipe: CurrencyPipe,
              private bookService: BookService,
              private router: Router) {
  }

  generateArray(n: number): number[] {
    return Array(n);
  }

  getBook(): void {
    this.book = {
      authors: [{
        id: 0,
        name: ''
      }],
      cover: '',
      description: '',
      genres: [],
      id: 0,
      image: '',
      language: '',
      price: 0,
      rating: 0,
      year: 0,
      name: ''
    }
  }

  calculateRating(): void {
    this.book.rating = this.displayRating * 2;
    this.fullRating = Math.floor(this.book.rating / 2);
    this.halfRating = this.book.rating % 2;
  }

  changePrice(): void {
    if (this.formattedAmount[0] < '0' || this.formattedAmount[0] > '9')
      this.book.price = parseFloat(this.formattedAmount.substr(1));
    else
      this.book.price = parseFloat(this.formattedAmount);
    this.formattedAmount = this.currencyPipe.transform(this.book.price, '$');
  }

  ngOnInit(): void {
    this.getBook()
    this.displayRating = this.book.rating / 2;
    this.calculateRating();
    this.formattedAmount = this.currencyPipe.transform(this.book.price);
  }

  save(): void {
    this.bookService.createBook(this.book).subscribe(book => {
      this.router.navigateByUrl('/books')
    });
  }

  calculateGenreWidth(genre: string) {
    return `calc(${genre.length}ch + 2px)`
  }

  updateGenreField(event: Event) {
    const target = event.currentTarget;
    target['style'].width = `${target['value'].length + 1}ch'`;
  }

  deleteGenre(genre: Genre) {
    this.book.genres = this.book.genres.filter(book_genre => book_genre != genre);
  }

  createGenre() {
    this.book.genres.push(new Genre(''));
  }
}
