import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkorderPanelComponent } from './workorder-panel.component';

describe('WorkorderPanelComponent', () => {
  let component: WorkorderPanelComponent;
  let fixture: ComponentFixture<WorkorderPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkorderPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkorderPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
