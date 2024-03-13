import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FlightsRoutingModule } from './flights-routing.module';
import { AddFlightsComponent } from './add-flights/add-flights.component';
import { ListFlightsComponent } from './list-flights/list-flights.component';
import { AppMaterialModule } from '../shared/app-materian.module';

import { NgxCurrencyModule, CurrencyMaskInputMode } from "ngx-currency";

export const customCurrencyMaskConfig = {
  align: "right",
  allowNegative: false,
  allowZero: false,
  decimal: ",",
  precision: 0,
  prefix: "$ ",
  suffix: "",
  thousands: ".",
  nullable: false,
  min: null,
  max: null,
  inputMode: CurrencyMaskInputMode.FINANCIAL
};

@NgModule({
  declarations: [
    AddFlightsComponent,
    ListFlightsComponent
  ],
  imports: [
    CommonModule,
    FlightsRoutingModule,
    AppMaterialModule,
    
    NgxCurrencyModule.forRoot(customCurrencyMaskConfig)
  ]
})
export class FlightsModule { }
