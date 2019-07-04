import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  teamCategories = [
      `Men's open`,
      `Men's over 35`,
      `Women's open`,
      `Boy's under 8`,
      `Boy's under 12`,
      `Boys under 16`,
      `Toddlers`,
      `Girl's under 10`,
      `Girl's under 14`,
  ];

  selectedTeam = this.teamCategories[0];

  constructor() { }

  ngOnInit() {
    console.log(this.selectedTeam);
  }

  segmentChanged($event) {
    // ion-sb-1
    const id = $event.detail.value.substr(-1, 1);
    console.log(this.teamCategories[id]);
  }
}
