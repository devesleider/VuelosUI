import { Component } from '@angular/core';
import { ReportsService } from '../reports.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public chart: any;
  labels = [];
  data = [];
  countAirlinea = 0
  // Importación no utilizada: public barChartLabels: Label[] = [];

  constructor(private reportsService: ReportsService) { }

  ngOnInit(): void {
    this.getcountAirlines();
    this.getTopReservation();

  }

  getTopReservation() {
    this.reportsService.getTopReservation().subscribe((data: any) => {
      this.labels = data.reservation.map(reservation => reservation.airline.nombre);
      this.data = data.reservation.map(reservation => reservation.reservationCount);
      this.createChart();
    });
  }

  getcountAirlines() {
    this.reportsService.getCountAirlines().subscribe((data: any) => {
      this.countAirlinea = data.countAirline
    });
  }

  createChart() {

    this.chart = new Chart("MyChart", {
      type: 'bar', //this denotes tha type of chart

      data: {// values on X-Axis
        labels: this.labels,
        datasets: [
          {
            label: "Reservas",
            barPercentage:0.2,
            barThickness: 'flex',
            data: this.data,
            backgroundColor: 'cadetblue'
          }
        ]
      },
      options: {
        bar: {
          datasets: {
            barThickness: 0.25
          }
        },
        scales: {
          y: {
            max: this.data[0] + 1,
            min: 0,
            ticks: {
              stepSize: 1
            }
          }
        }
      }

    });
  }
}
