import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditFactoryItemComponent } from './edit-factory-item.component';

describe('EditFactoryItemComponent', () => {
  let component: EditFactoryItemComponent;
  let fixture: ComponentFixture<EditFactoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditFactoryItemComponent]
    });
    fixture = TestBed.createComponent(EditFactoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
