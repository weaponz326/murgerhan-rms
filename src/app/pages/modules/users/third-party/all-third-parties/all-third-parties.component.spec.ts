import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllThirdPartiesComponent } from './all-third-parties.component';

describe('AllThirdPartiesComponent', () => {
  let component: AllThirdPartiesComponent;
  let fixture: ComponentFixture<AllThirdPartiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllThirdPartiesComponent]
    });
    fixture = TestBed.createComponent(AllThirdPartiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
