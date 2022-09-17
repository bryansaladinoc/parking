import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResidentsVehiclesComponent } from './residents-vehicles.component';

describe('ResidentsVehiclesComponent', () => {
  let component: ResidentsVehiclesComponent;
  let fixture: ComponentFixture<ResidentsVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResidentsVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResidentsVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
