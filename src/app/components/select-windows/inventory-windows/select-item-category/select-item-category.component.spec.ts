import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectItemCategoryComponent } from './select-item-category.component';

describe('SelectItemCategoryComponent', () => {
  let component: SelectItemCategoryComponent;
  let fixture: ComponentFixture<SelectItemCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectItemCategoryComponent]
    });
    fixture = TestBed.createComponent(SelectItemCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
