import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFlightsComponent } from '../add-flights/add-flights.component';
import { FlightsService } from '../flights.service';

@Component({
  selector: 'app-list-flights',
  templateUrl: './list-flights.component.html',
  styleUrls: ['./list-flights.component.scss']
})
export class ListFlightsComponent {
  displayedColumns: string[] = ['Vuelo', 'Aerolinea', 'Origen', 'Destino', 'FechaSalida', 'FechaLlegada', 'Precio'];
  dataSource = [];
  loanding = false;

  constructor(
    private flightsService: FlightsService,
    public dialog: MatDialog
  ) {

  }

  ngOnInit() {
    this.getAllFlights();
  }

  addFlight() {
    const dialogRef = this.dialog.open(AddFlightsComponent,
      {
        disableClose: true
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getAllFlights();
      }
    });

  }

  getAllFlights() {
    this.loanding = true;
    this.flightsService.getflights().subscribe(
      {
        next: (data: any) => {
          this.dataSource = data.flights;
          console.log(this.dataSource)
        }, error: (error) => {

        }, complete: () => {
          this.loanding = false;
        }
      }
    );
  }




}
