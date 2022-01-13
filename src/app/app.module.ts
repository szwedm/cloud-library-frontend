import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './signin/signin.component';
import { SignupComponent } from './signup/signup.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { BookListComponent } from './book-list/book-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { BookAddComponent } from './book-add/book-add.component';
import { BookEditComponent } from './book-edit/book-edit.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { AuthGuard } from './helpers/auth.guard';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    SignupComponent,
    BookListComponent,
    TopBarComponent,
    BookAddComponent,
    BookEditComponent,
    UserListComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'users', component: UserListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['administrator'] } },
      { path: 'users/:userId', component: UserEditComponent, canActivate: [AuthGuard], data: { expectedRoles: ['administrator', 'reader'] } },
      { path: 'books', component: BookListComponent, canActivate: [AuthGuard], data: { expectedRoles: ['administrator', 'reader'] } },
      { path: 'books/add', component: BookAddComponent, canActivate: [AuthGuard], data: { expectedRoles: ['administrator'] } },
      { path: 'books/:bookId', component: BookEditComponent, canActivate: [AuthGuard], data: { expectedRoles: ['administrator'] } },
    ])
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
