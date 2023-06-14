import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddTaskItemComponent } from './add-task-item.component';

describe('AddTaskItemComponent', () => {
  let component: AddTaskItemComponent;
  let fixture: ComponentFixture<AddTaskItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddTaskItemComponent]
    });
    fixture = TestBed.createComponent(AddTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
