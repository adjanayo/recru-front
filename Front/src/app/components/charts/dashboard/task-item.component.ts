import { Component, input, output, computed } from '@angular/core';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-task-item',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="flex items-center p-3 rounded-lg hover:bg-amber-50 transition-colors">
      <div class="flex-shrink-0 mr-3">
        <button (click)="toggle.emit()"
          class="h-5 w-5 rounded-full border flex items-center justify-center"
          [ngClass]="task().completed ? 'bg-terracotta-600 border-terracotta-600' : 'border-gray-300'">
          @if (task().completed) { <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 text-white"><path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg> }
        </button>
      </div>

      <div class="flex-1 min-w-0">
        <p class="text-sm" [ngClass]="task().completed ? 'text-gray-500 line-through' : 'text-gray-800'">
          {{ task().title }}
        </p>
        <div class="flex items-center mt-1 text-xs text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
          </svg>
          <span>{{ task().date }}</span>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="h-3 w-3 ml-2 mr-1">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
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



  priorityClass = computed(() => {
    const p = this.task().priority;
    if (p === 'high') return 'bg-red-100 text-red-800';
    if (p === 'low') return 'bg-green-100 text-green-800';
    return 'bg-amber-100 text-amber-800';
  });
}
