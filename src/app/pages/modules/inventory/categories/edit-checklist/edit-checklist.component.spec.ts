import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChecklistComponent } from './edit-checklist.component';

describe('EditChecklistComponent', () => {
  let component: EditChecklistComponent;
  let fixture: ComponentFixture<EditChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditChecklistComponent]
    });
    fixture = TestBed.createComponent(EditChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
