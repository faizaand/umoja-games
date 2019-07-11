import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  constructor() { }

  public getMatchList() {
    const dummyList = [
      {
        team1: 'Whoville',
        team2: 'Japanville',
        score1: 0,
        score2: 3,
        field: 'Field 3B',
        date: '08/03/2019',
        time: '3pm',
        category: 'Men\'s open'
      },

      {
        team1: 'Austria',
        team2: 'Tunisia',
        score1: 64,
        score2: 128,
        field: 'Field 3B',
        date: '08/03/2019',
        time: '3pm',
        category: 'Men\'s over 35'
      },

      {
        team1: 'Koreatown',
        team2: 'Chinatown',
        score1: 3,
        score2: 6,
        field: 'Field 2A',
        date: '08/04/2019',
        time: '7pm',
        special: 'finals',
        category: 'Men\'s open'
      }
    ];
    return new Promise(resolve => resolve(dummyList));
  }
  public getCategories() {
    const dummyList = [
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
    return new Promise(resolve => resolve(dummyList));
  }
}
