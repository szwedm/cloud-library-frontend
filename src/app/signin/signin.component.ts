import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signin() {
    const val = this.signinForm.value;

    if (val.username && val.password) {
      this.authService.signin(val.username, val.password)
        .subscribe(() => {
          this.router.navigateByUrl('/books')
        });
    }
  }

}
