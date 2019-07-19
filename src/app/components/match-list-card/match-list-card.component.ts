import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-match-list-card',
  templateUrl: './match-list-card.component.html',
  styleUrls: ['./match-list-card.component.scss'],

})
export class MatchListCardComponent implements OnInit {

  @Input() public match;

  constructor() { }

  ngOnInit() {}

}
