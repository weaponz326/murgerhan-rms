import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllLogsComponent } from './all-logs.component';

describe('AllLogsComponent', () => {
  let component: AllLogsComponent;
  let fixture: ComponentFixture<AllLogsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllLogsComponent]
    });
    fixture = TestBed.createComponent(AllLogsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
