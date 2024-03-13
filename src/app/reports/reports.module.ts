import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReportsRoutingModule } from './reports-routing.module';
import { HomeComponent } from './home/home.component';
import { AppMaterialModule } from '../shared/app-materian.module';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ReportsRoutingModule,
    AppMaterialModule,
  ]
})
export class ReportsModule { }
