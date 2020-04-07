import {AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Book} from '../models/book';

@Component({
  selector: 'app-book-card',
  templateUrl: './book-card.component.html',
  styleUrls: ['./book-card.component.css']
})
export class BookCardComponent implements OnInit {
  @Input() book: Book;
  fullRating: number;
  halfRating: number;
  clickHandler: any;
  @ViewChild('button') button: ElementRef;
  @ViewChild('text') text: ElementRef;
  @ViewChild('i') i: ElementRef;
  animation: any;
  start: number;
  generateArray(n:number): number[] {
    return Array(n);
  }
  constructor() { }

  ngOnInit(): void {
    this.fullRating = Math.floor(this.book.rating / 2);
    this.halfRating = this.book.rating % 2;
    this.clickHandler = this.createOrder.bind(this);
    this.animation = this.animate.bind(this);
  }

  animate(time: number) {
    const duration = 2000;
    let timeFraction = (time - this.start) / duration;
    console.log(timeFraction);
    if (timeFraction > 1) {
      timeFraction = 1;
    }
    if (timeFraction < 0.2) {
      this.text.nativeElement.style.display = 'none';
      this.button.nativeElement.style.width = '20%';
    }
    else if (timeFraction < 0.5) {
      this.i.nativeElement.style.display = 'inline';
      this.i.nativeElement.style.opacity = '' + ((timeFraction - 0.2) / 0.3) * 100 + '%';
    }
    else if (timeFraction < 0.8) {
      this.i.nativeElement.style.opacity = '' + (100 - (timeFraction - 0.5) / 0.2 * 100) + '%';
      this.button.nativeElement.style.width = '80%';
    }
    else {
      this.text.nativeElement.style.display = 'inline';
      this.i.nativeElement.style.display = 'none';
      this.text.nativeElement.style.opacity = '' + (timeFraction - 0.6) / 0.5 * 100 + '%';
    }
    if (timeFraction < 1) requestAnimationFrame(this.animation);
  }

  createOrder():void {
    this.start = performance.now();
    requestAnimationFrame(this.animation);
  }
}
