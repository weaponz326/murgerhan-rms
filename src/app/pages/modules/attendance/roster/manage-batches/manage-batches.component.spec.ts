import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBatchesComponent } from './manage-batches.component';

describe('ManageBatchesComponent', () => {
  let component: ManageBatchesComponent;
  let fixture: ComponentFixture<ManageBatchesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageBatchesComponent]
    });
    fixture = TestBed.createComponent(ManageBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
