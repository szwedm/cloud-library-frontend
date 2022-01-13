import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  id: string;
  isLoggedIn = false;
  isReader = false;
  isAdministrator = false;
  
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.id = user.id;

      if (user.role === "reader") {
        this.isReader = true;
      } else if (user.role === "administrator") {
        this.isReader = true;
        this.isAdministrator = true;
      }
    }
  }

  onBooks() {
    this.router.navigateByUrl('/books');
  }

  onUsers() {
    this.router.navigateByUrl('/users');
  }

  onProfile() {
    this.router.navigateByUrl('/users/' + this.id);
  }

  onSignout() {
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/signin');
  }

}
