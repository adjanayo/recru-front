import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-stat-card',
  standalone: true,
  imports: [CommonModule],
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
                @if (changeType() === 'positive') {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 18 9 11.25l4.306 4.306a11.95 11.95 0 0 1 5.814-5.518l2.74-1.22m0 0-5.94-2.281m5.94 2.28-2.28 5.941" />
                  </svg>
                } @else {
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 mr-1">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 6 9 12.75l4.286-4.286a11.948 11.948 0 0 1 4.306 5.109l5.31 1.77m0 0-5.466 2.511m5.466-2.511-2.511-5.466" />
                  </svg>
                }
                {{ change() }}
              </span>
              <span class="text-xs text-gray-500 ml-1">vs mois dernier</span>
            </div>
          }
        </div>
        <div [ngClass]="bgColorClass()" class="h-12 w-12 rounded-lg flex items-center justify-center text-white">
          <!-- Icon placeholder or SVG if redundant check needed -->
           <div class="h-6 w-6"></div>
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



  textColorClass = computed(() => `text-${this.color()}-600`);
  bgColorClass = computed(() => `bg-${this.color()}-600`);
}
