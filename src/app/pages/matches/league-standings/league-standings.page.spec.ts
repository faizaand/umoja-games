import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeagueStandingsPage } from './league-standings.page';

describe('LeagueStandingsPage', () => {
  let component: LeagueStandingsPage;
  let fixture: ComponentFixture<LeagueStandingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeagueStandingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeagueStandingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
