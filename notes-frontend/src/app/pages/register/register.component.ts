import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  user = { name: '', email: '', password: '' };
  error: { [key: string]: string } = {};
  message = '';

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    this.error = {};
    this.message = '';

    this.authService.register(this.user).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.message = '✅ Registration successful! Redirecting...';
        setTimeout(() => {
          this.router.navigate(['/notes']);
        }, 1500);
      },
      error: (err) => {
        if (err.error?.errors) {
          // validation errors من الباك إند
          err.error.errors.forEach((e: any) => {
            this.error[e.param] = e.msg;
          });
        } else {
          // رسالة عامة
          this.message = '❌ Registration failed. Please try again.';
        }
      }
    });
  }
}

