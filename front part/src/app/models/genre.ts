export class Genre {
  static id_counter: number = 0;
  id: number;
  name: string;

  constructor(name: string) {
    this.id = Genre.id_counter++;
    this.name = name;
  }
}
