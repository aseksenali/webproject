import { Component, OnInit } from '@angular/core';
import {faSearch, faShoppingCart, faUser} from '@fortawesome/free-solid-svg-icons';
import {UserService} from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  faShoppingCart = faShoppingCart;
  faAccount = faUser;
  faSearch = faSearch;
  searchHover = false;
  searchFocus = false;
  filterOpen = false;
  constructor() { }

  ngOnInit(): void {
  }

  showPopup() {
    this.filterOpen = !this.filterOpen;
  }
}
