import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RostersPage } from './rosters.page';

describe('RostersPage', () => {
  let component: RostersPage;
  let fixture: ComponentFixture<RostersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RostersPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RostersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
