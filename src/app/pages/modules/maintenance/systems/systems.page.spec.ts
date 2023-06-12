import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemsPage } from './systems.page';

describe('SystemsPage', () => {
  let component: SystemsPage;
  let fixture: ComponentFixture<SystemsPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemsPage]
    });
    fixture = TestBed.createComponent(SystemsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
