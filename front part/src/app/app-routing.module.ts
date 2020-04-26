import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BookListComponent} from './book-list/book-list.component';
import {BookDetailsComponent} from './book-details/book-details.component';
import {AuthGuard} from './auth.guard';
import {LoginComponent} from './login/login.component';
import {BookCreateComponent} from './book-create/book-create.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BookListComponent, canActivate: [AuthGuard] },
  { path: 'books/create', component: BookCreateComponent, canActivate: [AuthGuard] },
  { path: 'books/:id', component: BookDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
