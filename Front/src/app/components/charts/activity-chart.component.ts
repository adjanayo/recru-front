import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, input, effect } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-activity-chart',
  standalone: true,
  template: `<div class="relative h-full w-full"><canvas #chartRef></canvas></div>`,
  styles: [`:host { display: block; height: 100%; width: 100%; }`]
})
export class ActivityChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartRef') chartRef!: ElementRef<HTMLCanvasElement>;
  data = input.required<any>();
  private chart?: Chart;

  constructor() {
    effect(() => {
      if (this.chart) {
        this.chart.data = this.data();
        this.chart.update();
      }
    });
  }

  ngAfterViewInit() {
    const ctx = this.chartRef.nativeElement.getContext('2d');
    if (ctx) {
      this.chart = new Chart(ctx, {
        type: 'line',
        data: this.data(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'top' }, tooltip: { mode: 'index', intersect: false } },
          scales: { y: { beginAtZero: true }, x: { grid: { display: false } } }
        }
      });
    }
  }

  ngOnDestroy() { this.chart?.destroy(); }
}
