import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    role: ['', Validators.required]
  });

  submitted = false;
  
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.signupForm.controls['role'].setValue("reader");
  }

  get f(): { [key: string]: AbstractControl } {
    return this.signupForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.signupForm.invalid) {
      return;
    }
    
    const val = this.signupForm.value;

    if (val.username && val.password && val.role) {
      this.authService.signup(val.username, val.password, val.role)
        .subscribe(() => {
          this.router.navigateByUrl('/signin')
        });
    }
  }

  onReset(): void {
    this.submitted = false;
    this.signupForm.reset();
    this.signupForm.controls['role'].setValue("reader");
  }

}
