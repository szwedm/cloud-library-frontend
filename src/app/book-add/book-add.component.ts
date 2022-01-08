import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BookService } from '../services/book.service';

@Component({
  selector: 'app-book-add',
  templateUrl: './book-add.component.html',
  styleUrls: ['./book-add.component.scss']
})
export class BookAddComponent implements OnInit {

  addBookForm = this.formBuilder.group({
    title: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(40)]],
    author: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    subject: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(20)]],
    bookFile: ['']
  });

  submitted = false;
  
  constructor(
    private bookService: BookService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.addBookForm.controls;
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      const file: File = event.target.files[0];
      this.addBookForm.get('bookFile').setValue(file);
    }
  }
  
  onSubmit() {
    this.submitted = true;

    if (this.addBookForm.invalid) {
      return;
    }

    if (this.addBookForm.get('bookFile').value == '') {
      window.alert("Book file is required!");
      return;
    }

    const formData = new FormData();
    formData.append('title', this.addBookForm.get('title').value);
    formData.append('author', this.addBookForm.get('author').value);
    formData.append('subject', this.addBookForm.get('subject').value);
    formData.append('bookFile', this.addBookForm.get('bookFile').value);

    this.bookService.addBook(formData)
      .subscribe(() => {
        this.router.navigateByUrl('/books')
      });
  }

}
