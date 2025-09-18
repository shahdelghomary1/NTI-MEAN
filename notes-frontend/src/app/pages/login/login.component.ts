import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  user = { email: '', password: '' };
  error: { [key: string]: string } = {};

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.user).subscribe({
      next: (res: any) => {
        this.authService.saveToken(res.token);
        this.router.navigate(['/notes']);
      },
      error: (err) => {
        if (err.error?.errors) {
          this.error = {};
          err.error.errors.forEach((e: any) => {
            this.error[e.param] = e.msg;
          });
        } else if (err.error?.message) {
          this.error = { general: err.error.message };
        }
      }
    });
  }
}



