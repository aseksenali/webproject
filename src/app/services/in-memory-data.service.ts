import { Injectable } from '@angular/core';
import {InMemoryDbService} from 'angular-in-memory-web-api';
import {Book} from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  constructor() { }

  createDb() {
    const books: Book[] = [{
      id: 1,
      name: 'The Lord of The Ring',
      price: 1.5,
      genre: ['horror', 'computer science'],
      author: ['J.J. Tolkien'],
      year: 2009,
      cover: 'strong',
      language: 'eng',
      image: 'https://cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_295x.jpg?v=1581105628%20295w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_394x.jpg?v=1581105628%20394w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_590x.jpg?v=1581105628%20590w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_700x.jpg?v=1581105628%20700w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_800x.jpg?v=1581105628%20800w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_1000x.jpg?v=1581105628%201000w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_1200x.jpg?v=1581105628%201200w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_1500x.jpg?v=1581105628%201500w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_1800x.jpg?v=1581105628%201800w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_2000x.jpg?v=1581105628%202000w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_2400x.jpg?v=1581105628%202400w,%20//cdn.shopify.com/s/files/1/0880/2454/products/IMG_2957_720457fa-07d5-478c-8a4f-2ca52697bca6_3787x.jpg?v=1581105628%203787w',
      rating: 7
    }, {
      id: 2,
      name: 'asdfsfsdf',
      price: 12.3,
      genre: ['horror', 'fantasy', 'asdfds', 'fdfsdfa', 'fdsfa', 'asdfdfdss', 'asdfasdf', 'hgkjhasdf', 'gahdsfjkasdf'],
      author: ['asdfsfd'],
      year: 2009,
      cover: 'strong',
      language: 'eng',
      image: '',
      rating: 10
    }, {
      id: 3,
      name: 'asdfsfsdf',
      price: 12.3,
      genre: ['horror', 'computer science'],
      author: ['asdfsfd'],
      year: 2009,
      cover: 'strong',
      language: 'eng',
      image: '',
      rating: 10
    }, {
      id: 4,
      name: 'asdfsfsdf',
      price: 12.3,
      genre: ['horror', 'computer science'],
      author: ['asdfsfd'],
      year: 2009,
      cover: 'strong',
      language: 'eng',
      image: '',
      rating: 10
    }, {
      id: 5,
      name: 'asdfsfsdf',
      price: 12.3,
      genre: ['horror', 'computer science'],
      author: ['asdfsfd'],
      year: 2009,
      cover: 'strong',
      language: 'eng',
      image: '',
      rating: 7
    }];
    return { books }
  }
}
