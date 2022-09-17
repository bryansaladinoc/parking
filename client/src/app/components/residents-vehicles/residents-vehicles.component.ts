import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Vehicle } from 'src/app/models/vehicle.model';
import { ParkingService } from 'src/app/services/parking.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-residents-vehicles',
  templateUrl: './residents-vehicles.component.html',
  styleUrls: ['./residents-vehicles.component.css']
})
export class ResidentsVehiclesComponent implements OnInit {

  @ViewChild('paymentTable', { static: false }) el!: ElementRef

  vehicle: Vehicle = {
    id: '',
    total_time: 0,
    month_payment: 0,
    user_id: 1,
    vehicle_type_id: 1,
  }

  vehicles: Vehicle[] = [];

  namePDF: string = '';

  constructor(
    private parkingService: ParkingService
  ) { }

  ngOnInit(): void {
    this.allVehicles();
  }

  allVehicles() {
    this.parkingService.getResidentsVehicles().subscribe(response => this.vehicles = response);
  }

  add() {
    this.parkingService.addResidentVehicle(this.vehicle).subscribe(response => {
      window.location.reload();
    });
  }

  downloadPDF() {
    // Extraemos el
    const DATA = this.el.nativeElement;
    const doc = new jsPDF('p', 'pt', 'a4');
    const options = {
      background: 'white',
      scale: 3
    };
    html2canvas(DATA, options).then((canvas) => {

      const img = canvas.toDataURL('image/PNG');

      // Add image Canvas to PDF
      const bufferX = 15;
      const bufferY = 15;
      const imgProps = (doc as any).getImageProperties(img);
      const pdfWidth = doc.internal.pageSize.getWidth() - 2 * bufferX;
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      doc.addImage(img, 'PNG', bufferX, bufferY, pdfWidth, pdfHeight, undefined, 'FAST');
      return doc;
    }).then((docResult) => {
      docResult.save(`${this.namePDF}.pdf`);
    });
  }

}
