import { Component, ElementRef, ViewChild, AfterViewInit, OnDestroy, input, effect } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-distribution-chart',
  standalone: true,
  template: `<div class="relative h-full w-full"><canvas #chartRef></canvas></div>`
})
export class DistributionChartComponent implements AfterViewInit, OnDestroy {
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
        type: 'doughnut',
        data: this.data(),
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: { legend: { position: 'right' } },
          cutout: '60%'
        }
      });
    }
  }

  ngOnDestroy() { this.chart?.destroy(); }
}
