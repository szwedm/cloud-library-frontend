import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
    role: ['', Validators.required]
  });
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const val = this.signupForm.value;

    if (val.username && val.password && val.role) {
      this.authService.signup(val.username, val.password, val.role)
        .subscribe(() => {
          this.router.navigateByUrl('/books')
        });
    }
  }

}
