import { environment } from './../../environments/environment';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule,RouterModule,FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  oldPassword: string = '';
  newPassword: string = '';
  message: string = '';
  error: string = '';

  constructor(public authService: AuthService, private http: HttpClient) {}

  changePassword() {
    this.http.put(`${environment.baseUrl}/auth/change-password`, {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword
    }).subscribe({
      next: () => {
        this.message = 'Password updated successfully';
        this.error = '';
        this.oldPassword = '';
        this.newPassword = '';
      },
      error: err => {
        this.error = err.error;
        this.message = '';
      }
    });
  }
}
