import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactoryItemFormComponent } from './factory-item-form.component';

describe('FactoryItemFormComponent', () => {
  let component: FactoryItemFormComponent;
  let fixture: ComponentFixture<FactoryItemFormComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FactoryItemFormComponent]
    });
    fixture = TestBed.createComponent(FactoryItemFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
