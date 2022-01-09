import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if (this.tokenStorage.isTokenExpired()) {
        return false;
      }
      
      const expectedRoles = route.data['expectedRoles'] as string[];
      const user = this.tokenStorage.getUser();
      console.warn(expectedRoles);

      if (expectedRoles.some(role => role === user.role)) {
        return true;
      }

      this.router.navigateByUrl("/books");
      return false;
  }
  
}
