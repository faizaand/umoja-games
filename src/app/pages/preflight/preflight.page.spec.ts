import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreflightPage } from './preflight.page';

describe('PreflightPage', () => {
  let component: PreflightPage;
  let fixture: ComponentFixture<PreflightPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreflightPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreflightPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
