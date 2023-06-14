import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddScheduleTaskComponent } from './add-schedule-task.component';

describe('AddScheduleTaskComponent', () => {
  let component: AddScheduleTaskComponent;
  let fixture: ComponentFixture<AddScheduleTaskComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddScheduleTaskComponent]
    });
    fixture = TestBed.createComponent(AddScheduleTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
