import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  signinForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoggedIn = false;
  role: string;
  
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  signin() {
    const val = this.signinForm.value;

    if (val.username && val.password) {
      this.authService.signin(val.username, val.password)
        .subscribe((data: User) => {
          this.tokenStorage.saveToken(data.token);
          this.tokenStorage.saveUser(data);
          this.router.navigateByUrl('/books')
        });
    }
  }

}
