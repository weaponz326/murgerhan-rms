import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllFactoryItemsComponent } from './all-factory-items.component';

describe('AllFactoryItemsComponent', () => {
  let component: AllFactoryItemsComponent;
  let fixture: ComponentFixture<AllFactoryItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllFactoryItemsComponent]
    });
    fixture = TestBed.createComponent(AllFactoryItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
