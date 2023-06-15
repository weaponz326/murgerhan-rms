import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryFormComponent } from './item-category-form.component';

describe('ItemCategoryFormComponent', () => {
  let component: ItemCategoryFormComponent;
  let fixture: ComponentFixture<ItemCategoryFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemCategoryFormComponent]
    });
    fixture = TestBed.createComponent(ItemCategoryFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
