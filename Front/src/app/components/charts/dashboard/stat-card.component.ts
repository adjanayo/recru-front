import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, TrendingUp, TrendingDown } from 'lucide-angular';

@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="bg-white rounded-xl shadow-md p-6 transition-transform hover:scale-105">
      <div class="flex justify-between">
        <div>
          <p class="text-sm font-medium text-gray-500">{{ title() }}</p>
          <p class="text-2xl font-bold mt-1" [ngClass]="textColorClass()">{{ value() }}</p>

          @if (change()) {
            <div class="flex items-center mt-2">
              <span class="text-xs font-medium flex items-center"
                    [ngClass]="changeType() === 'positive' ? 'text-green-600' : 'text-red-600'">
                <lucide-icon [name]="changeType() === 'positive' ? UpIcon : DownIcon" class="h-3 w-3 mr-1"></lucide-icon>
                {{ change() }}
              </span>
              <span class="text-xs text-gray-500 ml-1">vs mois dernier</span>
            </div>
          }
        </div>
        <div [ngClass]="bgColorClass()" class="h-12 w-12 rounded-lg flex items-center justify-center text-white">
          <lucide-icon [name]="icon()" class="h-6 w-6"></lucide-icon>
        </div>
      </div>
    </div>
  `
})
export class StatCardComponent {
  title = input.required<string>();
  value = input.required<string | number>();
  icon = input.required<any>();
  color = input<'terracotta' | 'amber' | 'green'>('terracotta');
  change = input<string | null>(null);
  changeType = input<'positive' | 'negative'>('positive');

  readonly UpIcon = TrendingUp;
  readonly DownIcon = TrendingDown;

  textColorClass = computed(() => `text-${this.color()}-600`);
  bgColorClass = computed(() => `bg-${this.color()}-600`);
}
