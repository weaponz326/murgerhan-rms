import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryItemsPage } from './factory-items.page';

describe('FactoryItemsPage', () => {
  let component: FactoryItemsPage;
  let fixture: ComponentFixture<FactoryItemsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoryItemsPage]
    });
    fixture = TestBed.createComponent(FactoryItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
