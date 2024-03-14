import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { FlightsService } from 'src/app/flights/flights.service';
import { CommonService } from 'src/app/shared/common.service';
import { AddReservationComponent } from '../add-reservation/add-reservation.component';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.scss']
})
export class ListReservationComponent {

  airports: any = [];
  flights: any = [];
  flightForm: FormGroup;
  sendFilters = false;

  constructor(
    private flightsService: FlightsService,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    this.getAirports();
    this.flightForm = this.formBuilder.group({
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha_salida: [new Date(), Validators.required],
      fecha_llegada: [new Date(), Validators.required]
    });
  }

  /**
   * Método para obteren los aeropuertos
   */
  getAirports() {
    this.commonService.getAirports().subscribe(
      {
        next: (data: any) => {
          this.airports = data.allAirports;
          console.log(this.airports)
        }, error: (error) => {

        }, complete: () => {

        }
      }
    );
  }

  /**
  * Método para dar formato a una fecha y validar la congruensia
  * @returns Un Date con la fecha.
  */
  getFromatDate(date?) {
    if (date) {
      const fechaLlegada = this.flightForm.get('fecha_llegada').value;
      const nuevaFecha = new Date(date);
      this.flightForm.get('fecha_llegada').setValue(fechaLlegada < nuevaFecha ? nuevaFecha : fechaLlegada);
      return nuevaFecha;
    }

    return new Date();
  }

  /**
  * Método para listar todos los vuelos segun los filtros
  */
  getFlightFilters() {
    this.flightsService.getflightsFilters(this.createFilters()).subscribe(
      {
        next: (data: any) => {
          this.sendFilters = true;
          this.flights = data.flights;
        }, error: (error) => {

        }, complete: () => {

        }
      }
    );
  }

  /**
  * Método para crear los filtros de la peticion
  */
  createFilters(): string {
    let origin = this.flightForm.get('origen').value;
    let destination = this.flightForm.get('destino').value;
    let leaving = this.formatDate(this.flightForm.get('fecha_llegada').value);
    let arrive = this.formatDate(this.flightForm.get('fecha_salida').value);
    let filters = `origen=${origin}&destino=${destination}&fecha_salida=${leaving}&fecha_llegada=${arrive}`
    return filters;
  }

  /**
  * Método para dar formato a una fecha
  * @returns Un Date con la fecha.
  */
  formatDate(date: string): string {
    const fechaConHora = new Date(date);
    const fechaFormateada = `${fechaConHora.getFullYear()}-${this.padZero(fechaConHora.getMonth() + 1)}-${this.padZero(fechaConHora.getDate())}`;
    return fechaFormateada;
  }

  /**
  * Método para mormalizar la fecha
  * @returns Un strin con un numero.
  */
  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

  /**
  * Método validar la congruencia del destino y el origen
  */
  validateRout() {
    if (this.flightForm.get('destino').value === this.flightForm.get('origen').value) {
      Swal.fire({
        icon: "error",
        title: 'El origen y el destino, no pueden ser iguales',
        showConfirmButton: false,
        timer: 2000
      });
      this.flightForm.get('destino').setValue('');
    }
  }

  /**
  * Método para abrir modal de registro de reserva
  */
  addReservation(id) {
    const dialogRef = this.dialog.open(AddReservationComponent,
      {
        width: '400px',
        disableClose: true,
        data: {
          id
        }
      });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getFlightFilters();
      }
    });

  }
}
