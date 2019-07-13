import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NearPage } from './near.page';

describe('NearPage', () => {
  let component: NearPage;
  let fixture: ComponentFixture<NearPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NearPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NearPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
