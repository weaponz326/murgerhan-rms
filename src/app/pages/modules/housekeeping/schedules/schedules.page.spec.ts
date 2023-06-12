import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulesPage } from './schedules.page';

describe('SchedulesPage', () => {
  let component: SchedulesPage;
  let fixture: ComponentFixture<SchedulesPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SchedulesPage]
    });
    fixture = TestBed.createComponent(SchedulesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
