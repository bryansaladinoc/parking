import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { OficialVehiclesComponent } from './components/oficial-vehicles/oficial-vehicles.component';
import { ResidentsVehiclesComponent } from './components/residents-vehicles/residents-vehicles.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'oficial-vehicles', component: OficialVehiclesComponent},
  { path: 'residents-vehicles', component: ResidentsVehiclesComponent},
  { path: 'home', component: HomeComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: HomeComponent, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
