import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  password = signal('');
  confirmPassword = signal('');
  acceptTerms = signal(false);
  isLoading = signal(false);
  errorMessage = signal('');

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async onSubmit(): Promise<void> {
    if (!this.firstName() || !this.lastName() || !this.email() || !this.password()) {
      this.errorMessage.set('Veuillez remplir tous les champs obligatoires');
      return;
    }

    if (this.password() !== this.confirmPassword()) {
      this.errorMessage.set('Les mots de passe ne correspondent pas');
      return;
    }

    if (this.password().length < 6) {
      this.errorMessage.set('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    if (!this.acceptTerms()) {
      this.errorMessage.set('Veuillez accepter les conditions d\'utilisation');
      return;
    }

    this.isLoading.set(true);
    this.errorMessage.set('');

    try {
      const success = await this.authService.signup({
        email: this.email(),
        password: this.password(),
        firstName: this.firstName(),
        lastName: this.lastName(),
        phone: this.phone()
      });

      if (success) {
        this.router.navigate(['/jobs']);
      } else {
        this.errorMessage.set('Une erreur est survenue lors de l\'inscription');
      }
    } catch (error) {
      this.errorMessage.set('Une erreur est survenue. Veuillez réessayer.');
    } finally {
      this.isLoading.set(false);
    }
  }
}
