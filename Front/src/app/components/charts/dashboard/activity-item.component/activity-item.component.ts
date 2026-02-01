import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';


// Interface pour typer l'objet activity
export interface Activity {
  type: 'message' | 'connection' | 'investment' | 'project';
  content: string;
  time: string;
  user?: {
    name: string;
    avatar: string;
  };
}

@Component({
  selector: 'app-activity-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './activity-item.component.html'
})
export class ActivityItemComponent {
  // Remplacement de defineProps par input signal
  activity = input.required<Activity>();

  // Définition des icônes Lucide

}
