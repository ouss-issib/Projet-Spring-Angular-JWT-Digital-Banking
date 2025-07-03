// src/app/services/auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly USER_KEY = 'ebanking_user';

  login(username: string, password: string): boolean {
    // For demo: accept any username/password, in real app call backend!
    if (username && password) {
      localStorage.setItem(this.USER_KEY, username);
      return true;
    }
    return false;
  }

  register(username: string, password: string): boolean {
    // For demo: always succeed, in real app call backend!
    if (username && password) {
      localStorage.setItem(this.USER_KEY, username);
      return true;
    }
    return false;
  }

  logout() {
    localStorage.removeItem(this.USER_KEY);
  }

  getUsername(): string | null {
    return localStorage.getItem(this.USER_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getUsername();
  }
}
