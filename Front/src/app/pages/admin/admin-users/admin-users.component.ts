import { Component, signal, computed, effect } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../../types/user.type';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule, FormsModule, ConfirmationModalComponent],
  templateUrl: './admin-users.component.html',
  styleUrl: './admin-users.component.css'
})
export class AdminUsersComponent {
  users = signal<User[]>([]);

  // Confirmation Modal State
  showConfirmModal = signal(false);
  userToToggle = signal<User | null>(null);

  // Pagination & Filtering
  searchTerm = signal('');
  selectedRole = signal<string>('all');
  currentPage = signal(1);
  itemsPerPage = signal(5);
  totalItems = signal(0);
  totalPages = signal(0);

  // Derived state for stats
  stats = computed(() => this.userService.getUserStats());

  protected Math = Math;

  constructor(private userService: UserService) {
    // Effect equivalent to react to changes and load users
    effect(() => {
      this.loadUsers();
    });
  }

  loadUsers() {
    const params = {
      page: this.currentPage(),
      limit: this.itemsPerPage(),
      search: this.searchTerm(),
      role: this.selectedRole()
    };

    const response = this.userService.getUsers(params);
    this.users.set(response.users);
    this.totalItems.set(response.total);
    this.totalPages.set(response.totalPages);
  }

  onSearch(term: string) {
    this.searchTerm.set(term);
    this.currentPage.set(1); // Reset to first page on search
  }

  onRoleChange(role: string) {
    this.selectedRole.set(role);
    this.currentPage.set(1); // Reset on filter change
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages()) {
      this.currentPage.set(page);
    }
  }

  initiateToggleStatus(user: User) {
    this.userToToggle.set(user);
    this.showConfirmModal.set(true);
  }

  async confirmToggle() {
    const user = this.userToToggle();
    if (user) {
      await this.userService.toggleUserStatus(user.id);
      this.loadUsers();
      this.closeModal();
    }
  }

  closeModal() {
    this.showConfirmModal.set(false);
    this.userToToggle.set(null);
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  }

  get pages(): number[] {
    return Array.from({ length: this.totalPages() }, (_, i) => i + 1);
  }
}
