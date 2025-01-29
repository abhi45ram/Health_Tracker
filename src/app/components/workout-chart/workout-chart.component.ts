import { Component, Input, OnChanges, SimpleChanges, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-workout-chart',
  templateUrl: './workout-chart.component.html',
  styleUrls: ['./workout-chart.component.scss'],
})
export class WorkoutChartComponent implements OnChanges {
  @Input() workouts: any[] = [];
  @ViewChild('chartCanvas') chartCanvas!: ElementRef;
  chart!: Chart;

  ngOnChanges(changes: SimpleChanges) {
    if (changes['workouts'] && this.workouts) {
      this.updateChart();
    }
  }

  updateChart() {
    if (this.chart) {
      this.chart.destroy();
    }

    const labels = this.workouts.map(workout => workout.type);
    const data = this.workouts.map(workout => workout.minutes);

    const ctx = this.chartCanvas.nativeElement.getContext('2d');
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Minutes',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.5)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: { beginAtZero: true }
        }
      }
    });
  }
}
