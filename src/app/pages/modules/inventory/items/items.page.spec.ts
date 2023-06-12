import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemsPage } from './items.page';

describe('ItemsPage', () => {
  let component: ItemsPage;
  let fixture: ComponentFixture<ItemsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItemsPage]
    });
    fixture = TestBed.createComponent(ItemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
