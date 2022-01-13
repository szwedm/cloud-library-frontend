import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user';
import { TokenStorageService } from '../services/token-storage.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  user: User;
  submitted = false;
  isAdministrator = false;
  
  editUserForm = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
    password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40)]],
    role: ['', Validators.required]
  });  
  
  constructor(
    private userService: UserService,
    private tokenStorageService: TokenStorageService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    this.userService.getUserByID(routeParams.get('userId'))
      .subscribe((data: User) => {
        this.user = data;
        this.editUserForm.controls['username'].setValue(this.user.username);
        this.editUserForm.controls['role'].setValue(this.user.role);
      }
    );

    if (this.tokenStorageService.getUser().role === "administrator") {
      this.isAdministrator = true;
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.editUserForm.controls;
  }

  onSubmit(): void {
    this.submitted = true;

    if (this.editUserForm.invalid) {
      return;
    }

    this.user.username = this.editUserForm.controls['username'].value;
    this.user.password = this.editUserForm.controls['password'].value;
    this.user.role = this.editUserForm.controls['role'].value;

    this.userService.editUserByID(this.user)
      .subscribe(() => {
        this.router.navigateByUrl('/users')
      });

  }

}
