import { Injectable } from '@angular/core';
import { AuthUser } from '../models/authUser';
import { JwtHelperService } from '@auth0/angular-jwt';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  private jwtHelper = new JwtHelperService();
  
  constructor() { }

  signOut(): void {
    localStorage.clear();
  }

  saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  saveUser(user: AuthUser): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  getUser(): AuthUser {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user);
    }

    return null;
  }

  isTokenExpired(): boolean {
    const token = localStorage.getItem(TOKEN_KEY);

    if (token == null) {
      return true;
    }

    return this.jwtHelper.isTokenExpired(token);
  }

}
