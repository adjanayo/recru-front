import { Component, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LucideAngularModule, Camera, Lock, Bell, ShieldCheck, Trash2 } from "lucide-angular";
import { AuthService } from '../../../services/auth.service';
import { ApplicationService } from '../../../services/application.service';
import { ConfirmationModalComponent } from '../../../components/confirmation-modal/confirmation-modal.component';

@Component({
  selector: 'admin-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, LucideAngularModule, ConfirmationModalComponent],
  templateUrl: './admin-profile.component.html',
  styleUrl: './admin-profile.component.css'
})
export class AdminProfileComponent implements OnInit {
  currentUser = computed(() => this.authService.currentUser());
  isEditing = signal(false);
  isSaving = signal(false);
  isUploadingCV = signal(false);
  showValidateModal = signal(false); // Only keep what's needed

  // Form fields
  firstName = signal('');
  lastName = signal('');
  email = signal('');
  phone = signal('');
  address = signal('');
  educationLevel = signal('');
  experience = signal('');
  location = signal('Dakar, Sénégal'); // Added for new design
  bio = signal('Entrepreneur passionné par les technologies agricoles innovantes. Fondateur de EcoFarm Sénégal, une plateforme qui aide les petits agriculteurs à optimiser leurs pratiques agricoles grâce à la technologie.');

  // Icons
  CameraIcon = Camera;
  LockIcon = Lock;
  BellIcon = Bell;
  ShieldIcon = ShieldCheck;
  TrashIcon = Trash2;

  // Mock stats for display
  stats = signal({
    views: 245,
    connections: 48,
    messages: 24,
    projects: 37
  });

  async deleteAccount() {
    this.closeModals();
    try {
        await this.authService.deleteAccount();
    } catch (e) {
        alert('Erreur lors de la suppression du compte');
    }
  }

  confirmDeleteAccount() {
    this.showValidateModal.set(true);
  }

  closeModals() {
    this.showValidateModal.set(false);
  }

  applicationStats = computed(() => {
    const user = this.currentUser();
    return user ? this.applicationService.getApplicationStats(user.id) : null;
  });

  constructor(
    private authService: AuthService,
    private applicationService: ApplicationService
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  loadUserData(): void {
    const user = this.currentUser();
    if (user) {
      this.firstName.set(user.firstName);
      this.lastName.set(user.lastName);
      this.email.set(user.email);
      this.phone.set(user.phone || '');
      this.address.set(user.address || '');
      this.educationLevel.set(user.educationLevel || '');
      this.experience.set(user.experience || '');
      // Note: location and bio are currently static for the redesign demo
    }
  }

  toggleEdit(): void {
    if (this.isEditing()) {
      this.loadUserData(); // Reset form
    }
    this.isEditing.update(v => !v);
  }

  // New signals
  showPasswordForm = signal(false);
  oldPassword = signal('');
  newPassword = signal('');
  confirmPassword = signal('');
  isChangingPassword = signal(false);

  async saveProfile(): Promise<void> {
    this.isSaving.set(true);

    try {
      const success = await this.authService.updateProfile({
        firstName: this.firstName(),
        lastName: this.lastName(),
        phone: this.phone(),
        address: this.address(),
        educationLevel: this.educationLevel(),
        experience: this.experience()
      });

      if (success) {
        this.isEditing.set(false);
        alert('Profil mis à jour avec succès !');
      }
    } catch (error) {
      alert('Une erreur est survenue lors de la mise à jour du profil');
    } finally {
      this.isSaving.set(false);
    }
  }

  // Password Logic
  togglePasswordForm(): void {
      this.showPasswordForm.update(v => !v);
      this.oldPassword.set('');
      this.newPassword.set('');
      this.confirmPassword.set('');
  }

  async changePassword(): Promise<void> {
    if (this.newPassword() !== this.confirmPassword()) {
        alert('Les nouveaux mots de passe ne correspondent pas');
        return;
    }

    this.isChangingPassword.set(true);
    try {
        const success = await this.authService.changePassword(this.oldPassword(), this.newPassword());
        if (success) {
            alert('Mot de passe changé avec succès');
            this.togglePasswordForm();
        } else {
            alert('Ancien mot de passe incorrect');
        }
    } catch (e) {
        alert('Erreur lors du changement de mot de passe');
    } finally {
        this.isChangingPassword.set(false);
    }
  }

  // Image Upload Logic
  async onProfilePhotoSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        try {
            await this.authService.uploadProfilePhoto(input.files[0]);
        } catch (e) {
            alert('Erreur lors de l\'upload de la photo de profil');
        }
    }
  }

  async onCoverPhotoSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) {
        try {
            await this.authService.uploadCoverPhoto(input.files[0]);
        } catch (e) {
            alert('Erreur lors de l\'upload de la photo de couverture');
        }
    }
  }

  triggerProfilePhotoInput(): void {
    document.getElementById('profile-photo-input')?.click();
  }

  triggerCoverPhotoInput(): void {
    document.getElementById('cover-photo-input')?.click();
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];

      // Vérifier le type de fichier
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        alert('Veuillez sélectionner un fichier PDF ou DOC/DOCX');
        return;
      }

      // Vérifier la taille (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Le fichier ne doit pas dépasser 5MB');
        return;
      }

      this.isUploadingCV.set(true);

      try {
        await this.authService.uploadCV(file);
        alert('CV téléchargé avec succès !');
      } catch (error) {
        alert('Une erreur est survenue lors du téléchargement du CV');
      } finally {
        this.isUploadingCV.set(false);
      }
    }
  }

  triggerFileInput(): void {
    document.getElementById('cv-input')?.click();
  }
}
