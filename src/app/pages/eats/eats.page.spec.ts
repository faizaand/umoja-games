import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EatsPage } from './eats.page';

describe('EatsPage', () => {
  let component: EatsPage;
  let fixture: ComponentFixture<EatsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EatsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
