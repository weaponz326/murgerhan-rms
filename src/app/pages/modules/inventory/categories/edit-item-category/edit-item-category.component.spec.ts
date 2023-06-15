import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditItemCategoryComponent } from './edit-item-category.component';

describe('EditItemCategoryComponent', () => {
  let component: EditItemCategoryComponent;
  let fixture: ComponentFixture<EditItemCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditItemCategoryComponent]
    });
    fixture = TestBed.createComponent(EditItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
