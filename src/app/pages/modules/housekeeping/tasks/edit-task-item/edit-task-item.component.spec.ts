import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTaskItemComponent } from './edit-task-item.component';

describe('EditTaskItemComponent', () => {
  let component: EditTaskItemComponent;
  let fixture: ComponentFixture<EditTaskItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditTaskItemComponent]
    });
    fixture = TestBed.createComponent(EditTaskItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
