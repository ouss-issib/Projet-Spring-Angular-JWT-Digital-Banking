import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  username: string = '';
  role: string = '';
  authService = inject(AuthService);

  ngOnInit() {
    this.username = this.authService.username || 'Guest';
    this.role = this.authService.roles.includes('ADMIN') ? 'ADMIN' : 'USER';
  }
}
