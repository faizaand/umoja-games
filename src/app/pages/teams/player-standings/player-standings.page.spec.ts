import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayerStandingsPage } from './player-standings.page';

describe('PlayerStandingsPage', () => {
  let component: PlayerStandingsPage;
  let fixture: ComponentFixture<PlayerStandingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlayerStandingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayerStandingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
