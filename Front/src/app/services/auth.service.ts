import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';
import { User, LoginCredentials, SignupData } from '../types/user.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSignal = signal<User | null>(null);
  public currentUser = this.currentUserSignal.asReadonly();

  constructor(private router: Router) {
    this.loadUserFromStorage();
  }

  private loadUserFromStorage(): void {
    const userJson = localStorage.getItem('currentUser');
    if (userJson) {
      this.currentUserSignal.set(JSON.parse(userJson));
    }
  }

  async login(credentials: LoginCredentials): Promise<boolean> {
    // Simulation d'appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock user
        const user: User = {
          id: '1',
          email: credentials.email,
          firstName: 'John',
          lastName: 'Doe',
          role: credentials.email.includes('admin') ? 'admin' : 'candidate',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.currentUserSignal.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(true);
      }, 500);
    });
  }

  async signup(data: SignupData): Promise<boolean> {
    // Simulation d'appel API
    return new Promise((resolve) => {
      setTimeout(() => {
        const user: User = {
          id: Math.random().toString(36).substr(2, 9),
          email: data.email,
          firstName: data.firstName,
          lastName: data.lastName,
          phone: data.phone,
          role: 'candidate',
          isActive: true,
          createdAt: new Date(),
          updatedAt: new Date()
        };

        this.currentUserSignal.set(user);
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(true);
      }, 500);
    });
  }

  logout(): void {
    this.currentUserSignal.set(null);
    localStorage.removeItem('currentUser');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  async updateProfile(userData: Partial<User>): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const currentUser = this.currentUser();
        if (currentUser) {
          const updatedUser = { ...currentUser, ...userData, updatedAt: new Date() };
          this.currentUserSignal.set(updatedUser);
          localStorage.setItem('currentUser', JSON.stringify(updatedUser));
          resolve(true);
        } else {
          resolve(false);
        }
      }, 500);
    });
  }

  async uploadCV(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const cvUrl = `cv/${file.name}`;
        this.updateProfile({ cvUrl });
        resolve(cvUrl);
      }, 1000);
    });
  }

  async uploadProfilePhoto(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock upload
        const photoUrl = URL.createObjectURL(file);
        this.updateProfile({ profilePhoto: photoUrl });
        resolve(photoUrl);
      }, 1000);
    });
  }

  async uploadCoverPhoto(file: File): Promise<string> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock upload
        const photoUrl = URL.createObjectURL(file);
        this.updateProfile({ coverPhoto: photoUrl });
        resolve(photoUrl);
      }, 1000);
    });
  }

  async changePassword(oldPass: string, newPass: string): Promise<boolean> {
    return new Promise((resolve) => {
      setTimeout(() => {
        // Mock password change logic
        if (oldPass === 'wrong') {
             resolve(false);
        } else {
             resolve(true);
        }
      }, 1000);
    });
  }

  async deleteAccount(): Promise<boolean> {
    return new Promise((resolve) => {
        setTimeout(() => {
            this.logout();
            resolve(true);
        }, 1000);
    });
  }
}
