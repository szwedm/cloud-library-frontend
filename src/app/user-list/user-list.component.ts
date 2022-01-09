import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../models/user';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  users: User[];

  constructor(
    private userService: UserService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers()
      .subscribe((data: User[]) => {
        this.users = data;
      });
  }

  onEdit(id: string) {
    this.router.navigateByUrl('/users/' + id);
  }

  onDelete(id: string) {
    this.userService.deleteUserByID(id)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
