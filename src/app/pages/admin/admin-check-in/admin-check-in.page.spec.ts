import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCheckInPage } from './admin-check-in.page';

describe('AdminCheckInPage', () => {
  let component: AdminCheckInPage;
  let fixture: ComponentFixture<AdminCheckInPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminCheckInPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCheckInPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
