import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {BookService} from '../services/book.service';
import {Book} from '../models/book';
import {CommonModule, CurrencyPipe} from '@angular/common';
import {Location} from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';
import {Genre} from '../models/genre';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {
  book: Book;
  fullRating: number;
  halfRating: number;
  animation: any;
  displayRating: number;
  clickHandler: any;
  @ViewChild('button') button: ElementRef;
  @ViewChild('text') text: ElementRef;
  @ViewChild('i') i: ElementRef;
  start: number;
  formattedAmount: string;

  constructor(private activatedRoute: ActivatedRoute, private bookService: BookService, private currencyPipe: CurrencyPipe, private location: Location,
              private sanitizer: DomSanitizer, private router: Router) {

  }

  ngOnInit(): void {
    this.getBook();
    this.clickHandler = this.createOrder.bind(this);
    this.animation = this.animate.bind(this);
  }

  generateArray(n: number): number[] {
    return Array(n);
  }

  getBook(): void {
    const id = +this.activatedRoute.snapshot.paramMap.get('id');
    this.bookService.getBook(id).subscribe(book => {
      this.book = book;
      this.displayRating = this.book.rating / 2;
      this.calculateRating();
      this.formattedAmount = this.currencyPipe.transform(book.price);
    });
  }

  calculateRating(): void {
    this.book.rating = this.displayRating * 2;
    this.fullRating = Math.floor(this.book.rating / 2);
    this.halfRating = this.book.rating % 2;
  }

  animate(time: number) {
    const duration = 2000;
    let timeFraction = (time - this.start) / duration;
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    if (timeFraction < 0.2) {
      this.text.nativeElement.style.display = 'none';
      this.button.nativeElement.style.width = '5%';
    } else if (timeFraction < 0.5) {
      this.i.nativeElement.style.display = 'inline';
      this.i.nativeElement.style.opacity = '' + ((timeFraction - 0.2) / 0.3) * 100 + '%';
    } else if (timeFraction < 0.8) {
      this.i.nativeElement.style.opacity = '' + (100 - (timeFraction - 0.5) / 0.2 * 100) + '%';
      this.button.nativeElement.style.width = '20%';
    } else {
      this.text.nativeElement.style.display = 'inline';
      this.i.nativeElement.style.display = 'none';
      this.text.nativeElement.style.opacity = '' + (timeFraction - 0.6) / 0.5 * 100 + '%';
    }
    if (timeFraction < 1) requestAnimationFrame(this.animation);
  }

  createOrder(): void {
    this.start = performance.now();
    requestAnimationFrame(this.animation);
  }

  changePrice(): void {
    if (this.formattedAmount[0] < '0' || this.formattedAmount[0] > '9')
      this.book.price = parseFloat(this.formattedAmount.substr(1));
    else
      this.book.price = parseFloat(this.formattedAmount);
    this.formattedAmount = this.currencyPipe.transform(this.book.price, '$');
  }

  save(): void {
    this.bookService.updateBook(this.book).subscribe(() => this.goBack());
  }

  goBack(): void {
    this.location.back();
  }

  calculateGenreWidth(genre: string) {
    if (genre.length != 0) {
      return `calc(${genre.length}ch + 2px)`;
    } else {
      return '1ch';
    }
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

  deleteBook(): void {
    this.bookService.deleteBook(this.book).subscribe(() => this.router.navigateByUrl('/books'));
  }
}
