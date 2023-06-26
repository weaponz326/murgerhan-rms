import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IssueImagesComponent } from './issue-images.component';

describe('IssueImagesComponent', () => {
  let component: IssueImagesComponent;
  let fixture: ComponentFixture<IssueImagesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [IssueImagesComponent]
    });
    fixture = TestBed.createComponent(IssueImagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
