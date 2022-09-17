import { Component, OnInit } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ParkingService } from 'src/app/services/parking.service';

@Component({
  selector: 'app-oficial-vehicles',
  templateUrl: './oficial-vehicles.component.html',
  styleUrls: ['./oficial-vehicles.component.css']
})
export class OficialVehiclesComponent implements OnInit {
  vehicle: Vehicle = {
    id: '',
    total_time: 0,
    month_payment: 0,
    user_id: 1,
    vehicle_type_id: 2,
  }

  vehicles: Vehicle[] = [];

  constructor(
    private parkingService: ParkingService
  ) { }

  ngOnInit(): void {
    this.allVehicles();
  }

  allVehicles() {
    this.parkingService.getOficialVehicles().subscribe(response => this.vehicles = response);
  }

  add() {
    this.parkingService.addOficialVehicle(this.vehicle).subscribe(response => {
      window.location.reload();
    });
  }

}
