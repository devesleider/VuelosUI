import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FlightsService } from '../flights.service';
import { CommonService } from 'src/app/shared/common.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-add-flights',
  templateUrl: './add-flights.component.html',
  styleUrls: ['./add-flights.component.scss']
})
export class AddFlightsComponent {

  flightForm: FormGroup;
  aerolineas: any = [];
  airports: any = [];
  selectedTime: string;

  constructor(
    private flightsService: FlightsService,
    private commonService: CommonService,
    public dialogRef: MatDialogRef<AddFlightsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.getAirlines();
    this.getAirports();
    this.flightForm = this.formBuilder.group({
      numero_vuelo: ['', Validators.required],
      idAirline: ['', Validators.required],
      origen: ['', Validators.required],
      destino: ['', Validators.required],
      fecha_salida: [new Date(), Validators.required],
      hora_salida: ['', Validators.required],
      fecha_llegada: [new Date(), Validators.required],
      hora_llegada: ['', Validators.required],
      precio: ['', Validators.required]
    });
  }

  getAirlines() {
    this.commonService.getAirlines().subscribe(
      {
        next: (data: any) => {
          this.aerolineas = data.allAirline;
          console.log(this.aerolineas)
        }, error: (error) => {

        }, complete: () => {

        }
      }
    );
  }

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


  save() {
    if (this.flightForm.valid) {
      let flight = {
        numero_vuelo: this.flightForm.get('numero_vuelo').value,
        idAirline: this.flightForm.get('idAirline').value,
        origen: this.flightForm.get('origen').value,
        destino: this.flightForm.get('destino').value,
        fecha_salida: this.bindDateHour(new Date(this.flightForm.controls['fecha_salida'].value), this.flightForm.controls['hora_salida'].value), // Suponiendo que es un objeto Date
        fecha_llegada:this.bindDateHour(new Date(this.flightForm.controls['fecha_llegada'].value), this.flightForm.controls['hora_llegada'].value), // Suponiendo que es un objeto Date
        precio: this.flightForm.get('precio').value
      };
      this.flightsService.createflight(flight).subscribe(
        {
          next: (data: any) => {
            Swal.fire({
              icon: "success",
              title: "Se ha creado el vuelo",
              showConfirmButton: false,
              timer: 1500
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
  }

  bindDateHour(date: Date, hour: string): string {
    const [horas, minutos] = hour.split(':').map(Number);
    const fechaConHora = new Date(date);
    fechaConHora.setHours(horas);
    fechaConHora.setMinutes(minutos);
    const fechaFormateada = `${fechaConHora.getFullYear()}-${this.padZero(fechaConHora.getMonth() + 1)}-${this.padZero(fechaConHora.getDate())} ${this.padZero(fechaConHora.getHours())}:${this.padZero(fechaConHora.getMinutes())}`;
    return fechaFormateada;
  }

  padZero(num: number): string {
    return num < 10 ? '0' + num : '' + num;
  }

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

  getFromatDate(date?) {
    if (date) {
      const fechaLlegada = this.flightForm.get('fecha_llegada').value;
      const nuevaFecha = new Date(date);
      this.flightForm.get('fecha_llegada').setValue(fechaLlegada < nuevaFecha ? nuevaFecha : fechaLlegada);
      return nuevaFecha;
    }
    return new Date();
  }

}
