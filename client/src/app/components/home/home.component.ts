import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Stay } from 'src/app/models/stay.model';
import { ParkingService } from '../../services/parking.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  stay: Stay = {
    entry_time: '',
    exit_time: '',
    time: 0,
    payment: 0,
    vehicle_type: '',
    vehicle_id: '',
  };

  arrStay: Stay[] = [];

  constructor(
    private parkingService: ParkingService
  ) {
  }

  ngOnInit(): void {
    this.allStay();
  }

  ngOnDestroy(): void {
  }

  allStay() {
    this.parkingService.getStay().subscribe({
      next: response => this.arrStay = response,
      error: error => console.log(error)
    });
  }

  entry() {
    this.stay.entry_time = this.getTime();

    this.parkingService.addEntry(this.stay).subscribe(response => {
      this.stay.vehicle_id = "";
      this.stay.vehicle_type = "";
      window.location.reload();
    });
  }

  showVehicleType(event: any) {
    this.parkingService.getVehicleType(this.stay.vehicle_id).subscribe({
      next: response => {
        const values = Object.values(response)[0];

        let name: string = "no residente";
        if (Object.values(response).length > 0) {
          name = values.name;
        }

        this.stay.vehicle_type = name;
      },
      error: error => console.log('Error al cargar el tipo de vehiculo')
    });
  }

  exit() {
    this.stay.exit_time = this.getTime();

    this.parkingService.addExit(this.stay).subscribe(response => {
      this.stay.payment = response;
      this.stay.vehicle_id = "";
      this.stay.exit_time = "";
    });
  }

  monthRestart() {
    this.parkingService.restartMonth().subscribe(response => console.log(response));
  }

  reload() {
    window.location.reload();
  }

  getTime() {
    const date: Date = new Date();
    const hr = date.getHours();
    const min = date.getMinutes();
    const time = `${hr}:${min}`;

    return time;
  }

}
