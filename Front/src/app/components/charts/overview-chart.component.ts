import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, input, effect } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-overview-chart',
  standalone: true,
  template: `<div class="relative h-full w-full"><canvas #chartRef></canvas></div>`
})
export class OverviewChartComponent implements AfterViewInit, OnDestroy {
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
        type: 'bar',
        data: this.data(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: { y: { beginAtZero: true } }
        }
      });
    }
  }

  ngOnDestroy() { this.chart?.destroy(); }
}
