import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListFlightsComponent } from './list-flights/list-flights.component';

const routes: Routes = [
  {
    path: '',
    component: ListFlightsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FlightsRoutingModule { }
