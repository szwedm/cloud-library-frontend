import { Component, OnInit } from '@angular/core';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {

  books: Book[];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.getBooks();
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

}
