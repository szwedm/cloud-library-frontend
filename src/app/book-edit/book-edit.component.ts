import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Book } from '../models/book';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.scss']
})
export class BookEditComponent implements OnInit {

  book: Book;
  
  submitted = false;
  
  editBookForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    author: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]]
  });
  
  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.book = this.bookService.loadBookToEdit();
    this.bookService.emptyBookToEditBuffer();

    this.editBookForm.controls['title'].setValue(this.book.title);
    this.editBookForm.controls['author'].setValue(this.book.author);
    this.editBookForm.controls['subject'].setValue(this.book.subject);
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editBookForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.editBookForm.invalid) {
      return;
    }

    this.book.title = this.editBookForm.controls['title'].value;
    this.book.author = this.editBookForm.controls['author'].value;
    this.book.subject = this.editBookForm.controls['subject'].value;

    this.bookService.editBookByID(this.book)
      .subscribe(() => {
        this.router.navigateByUrl('/books')
      });
  }

}
