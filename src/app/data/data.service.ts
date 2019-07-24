import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from './match';
import {Player} from './player';
import {Team} from './team';
import {Media} from './media';
import {take} from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private db: AngularFirestore) {
    }

    getMatchById$(matchId: number) {
        const doc = this.db.doc<Match>('matches/' + matchId);
        return doc.valueChanges();
    }

    getMatchesByCategory$(category: string) {
        const col = this.db.collection<Match>(
            'matches',
            ref => ref.where('categories', 'array-contains', category)
        );

        return col.valueChanges();
    }

    updateMatch(match: Match) {
        const doc = this.db.doc<Match>('matches/' + match.id);
        return doc.set(match);
    }

    getTeamsByCategory(category: string) {
        const col = this.db.collection<Team>(
            'teams',
            ref => ref.where('categories', 'array-contains', category)
        );

        return col.valueChanges().pipe(take(1));
    }

    getTeamById(teamId: number) {
        const doc = this.db.doc<Team>('teams/' + teamId);
        return doc.get().toPromise();
    }

    updateTeam(team: Team) {
        const doc = this.db.doc<Team>('teams/' + team.id);
        return doc.set(team);
    }

    getPlayerById$(player: number) {
        const doc = this.db.doc<Player>('players/' + player);
        return doc.valueChanges();
    }

    getPlayersByTeam$(teamId: number) {
        const col = this.db.collection<Player>('players', ref => ref.where('teams', 'array-contains', teamId.toString()));
        return col.valueChanges();
    }

    updatePlayer(player: Player) {
        const doc = this.db.doc<Player>('players/' + player.id);
        return doc.set(player);
    }

    getMediaById$(mediaId: number) {
        const doc = this.db.doc<Media>('media/' + mediaId);
        return doc.valueChanges();
    }


}
