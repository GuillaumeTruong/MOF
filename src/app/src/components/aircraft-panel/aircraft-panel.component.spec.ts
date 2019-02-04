import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AircraftPanelComponent } from './aircraft-panel.component';

describe('AircraftPanelComponent', () => {
  let component: AircraftPanelComponent;
  let fixture: ComponentFixture<AircraftPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AircraftPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AircraftPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
