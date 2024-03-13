import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'reservations',
    loadChildren:() =>import('./reservations/reservations.module').then(m=> m.ReservationsModule)
  },
  {
    path:'flights',
    loadChildren:() =>import('./flights/flights.module').then(m=> m.FlightsModule)
  },
  {
    path:'reports',
    loadChildren:() =>import('./reports/reports.module').then(m=> m.ReportsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
