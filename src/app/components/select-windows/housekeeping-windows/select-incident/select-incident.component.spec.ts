import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectIncidentComponent } from './select-incident.component';

describe('SelectIncidentComponent', () => {
  let component: SelectIncidentComponent;
  let fixture: ComponentFixture<SelectIncidentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectIncidentComponent]
    });
    fixture = TestBed.createComponent(SelectIncidentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
