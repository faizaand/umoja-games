import {Injectable} from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore';
import {Match} from './match';
import {Player} from './player';
import {Team} from './team';
import {Media} from './media';
import {take} from 'rxjs/operators';
import {Storage} from '@ionic/storage';
import {Registration} from './registration';
import {AngularFireStorage} from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    constructor(private db: AngularFirestore, private storage: Storage, private fireStorage: AngularFireStorage) {
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

    getMatchesByCategory(category: string) {
        const col = this.db.collection<Match>(
            'matches',
            ref => ref.where('categories', 'array-contains', category)
        );

        return col.get().toPromise();
    }

    getMatchesByField$(field: string) {
        const col = this.db.collection<Match>(
            'matches',
            ref => ref.where('field', '==', field)
        );
        return col.valueChanges();
    }

    updateMatch(match) {
        const doc = this.db.doc<Match>('matches/' + match.id);
        return doc.update(match);
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

    getMatchesByTeam(teamId: number) {
        const col = this.db.collection<Match>(
            'matches',
            ref => ref.where('teams', 'array-contains', teamId.toString())
        );

        return col.get().toPromise();
    }

    updatePlayer(player: Player) {
        const doc = this.db.doc<Player>('players/' + player.id);
        return doc.set(player);
    }

    getMediaById$(mediaId: number) {
        const doc = this.db.doc<Media>('media/' + mediaId);
        return doc.valueChanges();
    }

    followedTeams: string[] = [];

    getFollowedTeams() {
        this.storage.get('followed_teams').then(value => {
            if(!value) {
                this.storage.set('followed_teams', []);
                this.followedTeams = [];
                return;
            }
            this.followedTeams = value; // we need to keep a copy of this each time so we can append to it later
        });
        return this.storage.get('followed_teams');
    }

    addFollowedTeam(teamId: string) {
        this.followedTeams.push(teamId);
        this.storage.set('followed_teams', this.followedTeams);
    }

    removeFollowedTeam(teamId: string) {
        this.followedTeams = this.followedTeams.filter(team => team != teamId);
        this.storage.set('followed_teams', this.followedTeams);
    }

    getLinks$() {
        const col = this.db.collection('links');
        return col.valueChanges();
    }

    addRegistration(data: Registration) {
        const col = this.db.collection('registrations');
        return col.add(data);
    }

    // these are given as blobs
    addRegistrationImages(name, idPhoto, playerPhoto) {
        name = name.toLowerCase().replace(/ /g, "-");
        const path = 'registrations/' + name + "/";
        this.fireStorage.ref(path + "/id.png").putString(idPhoto.split('base64,')[1].replace(/\s/g, ''), 'base64', { contentType: 'image/jpg' });
        this.fireStorage.ref(path + "/player.png").putString(playerPhoto.split('base64,')[1].replace(/\s/g, ''), 'base64', { contentType: 'image/jpg' })
    }

}
