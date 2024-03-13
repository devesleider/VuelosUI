import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReservationsRoutingModule } from './reservations-routing.module';
import { AddReservationComponent } from './add-reservation/add-reservation.component';
import { ListReservationComponent } from './list-reservation/list-reservation.component';
import { AppMaterialModule } from '../shared/app-materian.module';


@NgModule({
  declarations: [
    AddReservationComponent,
    ListReservationComponent
  ],
  imports: [
    CommonModule,
    ReservationsRoutingModule,
    AppMaterialModule,
  ]
})
export class ReservationsModule { }
