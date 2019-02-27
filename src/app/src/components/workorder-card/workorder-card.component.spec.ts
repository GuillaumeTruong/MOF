import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {WorkOrderCardComponent} from './workorder-card.component';

describe('WorkOrderCardComponent', () => {
  let component: WorkOrderCardComponent;
  let fixture: ComponentFixture<WorkOrderCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkOrderCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkOrderCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
