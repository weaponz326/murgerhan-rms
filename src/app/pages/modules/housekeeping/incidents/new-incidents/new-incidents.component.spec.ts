import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewIncidentsComponent } from './new-incidents.component';

describe('NewIncidentsComponent', () => {
  let component: NewIncidentsComponent;
  let fixture: ComponentFixture<NewIncidentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewIncidentsComponent]
    });
    fixture = TestBed.createComponent(NewIncidentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
