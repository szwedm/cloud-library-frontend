import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
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
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]]
  });

  isLoggedIn = false;
  submitted = false
  role: string;
  
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signinForm.controls;
  }

  signin() {
    this.submitted = true;
    
    if (this.signinForm.invalid) {
      return;
    }
    
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
