import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BookListComponent } from './book-list/book-list.component';
import { BookCardComponent } from './book-card/book-card.component';
import { SaleWindowComponent } from './sale-window/sale-window.component';
import { FilterComponent } from './filter/filter.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from '@angular/forms';
import {CurrencyPipe} from '@angular/common';
import { LoginComponent } from './login/login.component';
import {RequestInterceptor} from './request.interceptor';
import { BookCreateComponent } from './book-create/book-create.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookListComponent,
    BookCardComponent,
    SaleWindowComponent,
    FilterComponent,
    BookDetailsComponent,
    LoginComponent,
    BookCreateComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [CurrencyPipe,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
