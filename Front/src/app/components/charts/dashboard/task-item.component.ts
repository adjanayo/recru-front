import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideAngularModule, Check, Calendar, Clock } from 'lucide-angular';

@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  template: `
    <div class="flex items-center p-3 rounded-lg hover:bg-amber-50 transition-colors">
      <div class="flex-shrink-0 mr-3">
        <button (click)="toggle.emit()"
          class="h-5 w-5 rounded-full border flex items-center justify-center"
          [ngClass]="task().completed ? 'bg-terracotta-600 border-terracotta-600' : 'border-gray-300'">
          @if (task().completed) { <lucide-icon [name]="CheckIcon" class="h-3 w-3 text-white"></lucide-icon> }
        </button>
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-sm" [ngClass]="task().completed ? 'text-gray-500 line-through' : 'text-gray-800'">
          {{ task().title }}
        </p>
        <div class="flex items-center mt-1 text-xs text-gray-500">
          <lucide-icon [name]="CalendarIcon" class="h-3 w-3 mr-1"></lucide-icon>
          <span>{{ task().date }}</span>
          <lucide-icon [name]="ClockIcon" class="h-3 w-3 ml-2 mr-1"></lucide-icon>
          <span>{{ task().time }}</span>
        </div>
      </div>

      <span class="px-2 py-0.5 rounded text-xs font-medium" [ngClass]="priorityClass()">
        {{ task().priority }}
      </span>
    </div>
  `
})
export class TaskItemComponent {
  task = input.required<any>();
  toggle = output<void>();

  readonly CheckIcon = Check;
  readonly CalendarIcon = Calendar;
  readonly ClockIcon = Clock;

  priorityClass = computed(() => {
    const p = this.task().priority;
    if (p === 'high') return 'bg-red-100 text-red-800';
    if (p === 'low') return 'bg-green-100 text-green-800';
    return 'bg-amber-100 text-amber-800';
  });
}
