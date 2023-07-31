import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SystemImagesComponent } from './system-images.component';

describe('SystemImagesComponent', () => {
  let component: SystemImagesComponent;
  let fixture: ComponentFixture<SystemImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SystemImagesComponent]
    });
    fixture = TestBed.createComponent(SystemImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
