import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/user.type';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  // Mock users data
  users = signal<User[]>([
    {
      id: '1',
      email: 'john.doe@example.com',
      firstName: 'John',
      lastName: 'Doe',
      phone: '+221 77 123 45 67',
      address: 'Dakar, Sénégal',
      educationLevel: 'Master',
      experience: '5 ans d\'expérience en développement web',
      cvUrl: '/cv/john-doe.pdf',
      role: 'candidate',
      isActive: true,
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-20')
    },
    {
      id: '2',
      email: 'fatou.ndiaye@example.com',
      firstName: 'Fatou',
      lastName: 'Ndiaye',
      phone: '+221 77 234 56 78',
      address: 'Abidjan, Côte d\'Ivoire',
      educationLevel: 'Licence',
      experience: '3 ans en design UI/UX',
      cvUrl: '/cv/fatou-ndiaye.pdf',
      role: 'candidate',
      isActive: true,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-18')
    },
    {
      id: '3',
      email: 'ibrahim.sow@example.com',
      firstName: 'Ibrahim',
      lastName: 'Sow',
      phone: '+221 77 345 67 89',
      address: 'Lomé, Togo',
      educationLevel: 'Bac+2',
      experience: 'Débutant en marketing digital',
      role: 'candidate',
      isActive: true,
      createdAt: new Date('2024-01-18'),
      updatedAt: new Date('2024-01-19')
    },
    {
      id: '4',
      email: 'admin@platform.com',
      firstName: 'Admin',
      lastName: 'Platform',
      role: 'admin',
      isActive: true,
      createdAt: new Date('2023-12-01'),
      updatedAt: new Date('2024-01-22')
    }
  ]);

  searchTerm = signal('');
  selectedRole = signal<string>('all');

  filteredUsers = computed(() => {
    let filtered = this.users();

    const term = this.searchTerm().toLowerCase();
    if (term) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    const role = this.selectedRole();
    if (role !== 'all') {
      filtered = filtered.filter(user => user.role === role);
    }

    return filtered;
  });

  stats = computed(() => ({
    total: this.users().length,
    candidates: this.users().filter(u => u.role === 'candidate').length,
    admins: this.users().filter(u => u.role === 'admin').length,
    active: this.users().filter(u => u.isActive).length
  }));

  toggleUserStatus(user: User): void {
    this.users.update(users =>
      users.map(u => u.id === user.id ? { ...u, isActive: !u.isActive } : u)
    );
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }
}
