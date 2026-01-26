import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MessageSquare,
  UserPlus,
  DollarSign,
  Lightbulb,
  LucideAngularModule
} from 'lucide-angular';

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
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './activity-item.component.html'
})
export class ActivityItemComponent {
  // Remplacement de defineProps par input signal
  activity = input.required<Activity>();

  // Définition des icônes Lucide
  readonly MessageIcon = MessageSquare;
  readonly UserIcon = UserPlus;
  readonly MoneyIcon = DollarSign;
  readonly ProjectIcon = Lightbulb;

  // Remplacement de computed (Vue) par computed (Angular Signal)
  activityIcon = computed(() => {
    const type = this.activity().type;

    const iconMap: Record<string, any> = {
      message: this.MessageIcon,
      connection: this.UserIcon,
      investment: this.MoneyIcon,
      project: this.ProjectIcon
    };

    return iconMap[type] || this.MessageIcon;
  });
}
