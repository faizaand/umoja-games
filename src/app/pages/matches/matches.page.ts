import { Component, OnInit } from '@angular/core';
import {MatchService} from '../../match.service';

@Component({
  selector: 'app-matches',
  templateUrl: './matches.page.html',
  styleUrls: ['./matches.page.scss'],
})
export class MatchesPage implements OnInit {

  categories: string[];
  selectedCategory: string;
  matches: object[];

  constructor(private matchService: MatchService) { }

  ngOnInit() {
    this.categories = this.matchService.getCategories();
    this.selectedCategory = this.categories[0];
    this.matches = this.matchService.getMatches();
  }

  segmentChanged($event: CustomEvent<any>) {
    const selectedIndex = $event.detail.value.substr(-1, 1);
    this.selectedCategory = this.categories[selectedIndex];
  }
}
