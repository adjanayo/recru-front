import { Injectable, signal } from '@angular/core';
import { User, UserProfile } from '../types/user.type'; // Adjust path if needed

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private usersSignal = signal<User[]>([]);
  public users = this.usersSignal.asReadonly();

  constructor() {
    this.loadMockUsers();
  }

  private loadMockUsers(): void {
    const mockUsers: User[] = [
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
    ];
    this.usersSignal.set(mockUsers);
  }

  // Simulated backend call with filtering and pagination
  getUsers(params: { page: number; limit: number; search: string; role: string } = { page: 1, limit: 10, search: '', role: 'all' }) {
    let filtered = this.usersSignal();

    const term = params.search.toLowerCase();
    if (term) {
      filtered = filtered.filter(user =>
        user.firstName.toLowerCase().includes(term) ||
        user.lastName.toLowerCase().includes(term) ||
        user.email.toLowerCase().includes(term)
      );
    }

    if (params.role !== 'all') {
      filtered = filtered.filter(user => user.role === params.role);
    }

    const total = filtered.length;
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginatedUsers = filtered.slice(start, end);

    return {
      users: paginatedUsers,
      total,
      page: params.page,
      limit: params.limit,
      totalPages: Math.ceil(total / params.limit)
    };
  }

  async toggleUserStatus(userId: string): Promise<boolean> {
     return new Promise((resolve) => {
      setTimeout(() => {
        this.usersSignal.update(users =>
          users.map(u => u.id === userId ? { ...u, isActive: !u.isActive } : u)
        );
        resolve(true);
      }, 300); // Simulate network delay
    });
  }

  getUserStats() {
    const allUsers = this.usersSignal();
    return {
      total: allUsers.length,
      candidates: allUsers.filter(u => u.role === 'candidate').length,
      admins: allUsers.filter(u => u.role === 'admin').length,
      active: allUsers.filter(u => u.isActive).length
    };
  }
}
