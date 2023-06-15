import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemIssuesHistoryComponent } from './system-issues-history.component';

describe('SystemIssuesHistoryComponent', () => {
  let component: SystemIssuesHistoryComponent;
  let fixture: ComponentFixture<SystemIssuesHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemIssuesHistoryComponent]
    });
    fixture = TestBed.createComponent(SystemIssuesHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
