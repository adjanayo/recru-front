import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, input, effect } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-growth-chart',
  standalone: true,
  template: `<div class="relative h-full w-full"><canvas #chartRef></canvas></div>`
})
export class GrowthChartComponent implements AfterViewInit, OnDestroy {
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
          plugins: { legend: { display: false } },
          elements: { line: { tension: 0.4 } }
        }
      });
    }
  }

  ngOnDestroy() { this.chart?.destroy(); }
}
