import { Book } from './book';

export interface User {
  login: string,
  password: string,
  email: string,
  firstName: string,
  lastName: string,
  age: number,
  books: Book[]
}
