import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';

@Injectable({
    providedIn: 'root'
})
export class MatchService {

    constructor(private firestore: AngularFirestore) {
    }

    getCategories(): string[] {
        return [
            'Men\'s Open',
            'Men\'s Over 35',
            'Women\'s Open',
            'Boy\'s Under 8',
            'Boy\'s Under 12',
            'Boy\'s Under 16',
            'Girl\'s Under 10',
            'Girl\'s Under 14',
            'Toddlers'
        ];
    }

    getMatches(): object[] {
        return [
            {
                id: 0,
                team1: 'Jaffery sports club & FRIENDS',
                team2: 'Orlando Orlandians',
                score1: 3,
                score2: 1,
                category: 'Men\'s Open',
                field: 'Field B',
                date: '08/03/2019',
                time: '3:00p',
            },
            {
                id: 1,
                team1: 'Japanese Tokyans',
                team2: 'Pyongyang Koreans',
                score1: 2,
                score2: 5,
                category: 'Men\'s Over 35',
                field: 'Field C',
                date: '08/04/2019',
                time: '6:00p',
            },
            {
                id: 2,
                team1: 'Bob Bobbers',
                team2: 'Steve Stevers',
                score1: 0,
                score2: 0,
                category: 'Men\'s Open',
                field: 'Field B',
                date: '08/03/2019',
                time: '5:00p',
            },

            {
                id: 3,
                team1: 'Allentown Allentowners',
                team2: 'Orlando Orlandians',
                score1: 3,
                score2: 1,
                field: 'Field B',
                category: 'Men\'s Open',
                date: '08/05/2019',
                time: '6:00p',
                special: 'finals'
            }
        ];
    }

    getMatchById(id: number): object {
        return this.getMatches()[id];
    }
}
