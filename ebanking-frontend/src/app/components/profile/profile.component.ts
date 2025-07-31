import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-profile',
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent {
  formGroup: FormGroup;

  successMessage!: string ;
  errorMessage!: string ;
  showToast = false;


  constructor(private fb: FormBuilder, public authService: AuthService, private router: Router) {
    this.formGroup = this.fb.group({
      oldPassword: ['', Validators.required],
      newPassword: ['', Validators.required],
      confirmNewPassword: ['', Validators.required]
    });
  }
  changePassword() {
    this.errorMessage = ''; // Clear previous errors
    if (this.formGroup.invalid) {
      this.errorMessage = 'Please fill in all fields.';
      return;
    }
    const { oldPassword, newPassword, confirmNewPassword } = this.formGroup.value;

    if (newPassword !== confirmNewPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
      // Optionally, mark the fields as touched to show validation
      this.formGroup.get('newPassword')?.markAsTouched();
      this.formGroup.get('confirmNewPassword')?.markAsTouched();
      return;
    }
    this.authService.changePassword(oldPassword, newPassword).subscribe({
      next: (response) => {
        if (response === "Password updated successfully") {
          this.successMessage = 'Password changed successfully';
          this.showToast = true;
          this.formGroup.reset();
          setTimeout(() => {
            this.showToast = false;
            this.successMessage = '';
            this.errorMessage = '';
            // Navigate to customers list after a short delay
            this.router.navigate(['/login'])
          }, 3000);

        } else {
          this.errorMessage = 'Unexpected response format';
        }
      },
      error: (err) => {
        this.errorMessage = 'Failed to change password: ' + (err?.error?.message || 'Unknown error');
      }
    });
  }


  logout() {
    this.authService.logout();
  }


}
