import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFactoryItemComponent } from './add-factory-item.component';

describe('AddFactoryItemComponent', () => {
  let component: AddFactoryItemComponent;
  let fixture: ComponentFixture<AddFactoryItemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddFactoryItemComponent]
    });
    fixture = TestBed.createComponent(AddFactoryItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
