import {Author} from './author';
import {Genre} from './genre';

export interface Book {
  id: number;
  name: string;
  price: number;
  genres: Genre[];
  authors: Author[];
  year: number;
  cover: string;
  language: string;
  image: string;
  rating: number;
  description: string;
}
