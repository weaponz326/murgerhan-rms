import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskItemFormComponent } from './task-item-form.component';

describe('TaskItemFormComponent', () => {
  let component: TaskItemFormComponent;
  let fixture: ComponentFixture<TaskItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TaskItemFormComponent]
    });
    fixture = TestBed.createComponent(TaskItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
