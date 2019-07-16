import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MatchAdminPage } from './match-admin.page';

describe('MatchAdminPage', () => {
  let component: MatchAdminPage;
  let fixture: ComponentFixture<MatchAdminPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MatchAdminPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MatchAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
