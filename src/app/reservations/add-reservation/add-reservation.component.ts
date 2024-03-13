import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ReservationsService } from '../reservations.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-reservation',
  templateUrl: './add-reservation.component.html',
  styleUrls: ['./add-reservation.component.scss']
})
export class AddReservationComponent {

  reservation: FormGroup;
  reservationCode = '';

  constructor(
    private reservationsService: ReservationsService,
    public dialogRef: MatDialogRef<AddReservationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.reservationCode = this.getReservationCode();
    this.reservation = this.formBuilder.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      documento: ['', Validators.required]
    });
  }

  //Crea un codigo de reserva
  getReservationCode(): string {
    const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let codigo = '';

    for (let i = 0; i < 2; i++) {
      codigo += letras.charAt(Math.floor(Math.random() * letras.length));
    }
    for (let i = 0; i < 4; i++) {
      codigo += Math.floor(Math.random() * 10);
    }
    return codigo;
  }

  save() {
    this.reservationsService.createReservation(this.createReservation()).subscribe(
      {
        next: (data: any) => {
          Swal.fire({
            icon: "success",
            title: "Se ha creado la reserva",
            showConfirmButton: false,
            timer: 2000
          });
          this.dialogRef.close(true);
        }, error: (error) => {
          Swal.fire({
            icon: "error",
            title: error.error.message,
            showConfirmButton: false,
            timer: 2000
          });
        }, complete: () => {

        }
      }
    );
  }

  createReservation() {
    let reservation = {
      numero_reserva: this.reservationCode,
      documento: this.reservation.get('documento').value,
      nombre_cliente: this.reservation.get('nombre').value,
      apellido_cliente: this.reservation.get('apellido').value,
      idVuelo: this.data.id,
      fecha_reserva: this.formatDate(new Date().toDateString())
    }
    return reservation;
  }

  formatDate(date: string): string {
    const fechaConHora = new Date(date);
    const fechaFormateada = `${fechaConHora.getFullYear()}-${this.padZero(fechaConHora.getMonth() + 1)}-${this.padZero(fechaConHora.getDate())}`;
    return fechaFormateada;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

}
