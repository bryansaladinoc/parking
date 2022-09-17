import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OficialVehiclesComponent } from './oficial-vehicles.component';

describe('OficialVehiclesComponent', () => {
  let component: OficialVehiclesComponent;
  let fixture: ComponentFixture<OficialVehiclesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OficialVehiclesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OficialVehiclesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
