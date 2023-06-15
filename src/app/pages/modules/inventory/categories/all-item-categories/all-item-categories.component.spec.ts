import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllItemCategoriesComponent } from './all-item-categories.component';

describe('AllItemCategoriesComponent', () => {
  let component: AllItemCategoriesComponent;
  let fixture: ComponentFixture<AllItemCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllItemCategoriesComponent]
    });
    fixture = TestBed.createComponent(AllItemCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
