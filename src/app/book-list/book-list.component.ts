import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];
  isAdministrator = false;

  constructor(
    private bookService: BookService,
    private tokenStorageService: TokenStorageService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getBooks();

    const user = this.tokenStorageService.getUser();

    if (!!user) {
      if (user.role === "administrator") {
        this.isAdministrator = true;
      }
    }
  }

  getBooks() {
    this.bookService.getBooks()
      .subscribe((data: Book[]) => {
        this.books = data;
      });
  }

  readBook(id: string) {
    this.bookService.getBookByID(id)
      .subscribe((data: Blob) => {
        let bookFile = new Blob([data], { type: 'application/pdf' })
        let bookFileURL = URL.createObjectURL(bookFile);
        window.open(bookFileURL);
      })
  }

  onAdd() {
    this.router.navigateByUrl('/books/add')
  }

  onEdit() {
    
  }

  onDelete() {
    
  }

}
