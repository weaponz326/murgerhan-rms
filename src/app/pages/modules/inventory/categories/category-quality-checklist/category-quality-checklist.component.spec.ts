import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryQualityChecklistComponent } from './category-quality-checklist.component';

describe('CategoryQualityChecklistComponent', () => {
  let component: CategoryQualityChecklistComponent;
  let fixture: ComponentFixture<CategoryQualityChecklistComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryQualityChecklistComponent]
    });
    fixture = TestBed.createComponent(CategoryQualityChecklistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
