import {Component, OnInit} from '@angular/core';
import {Match} from '../../data/match';
import {AngularFirestore} from '@angular/fire/firestore';

@Component({
    selector: 'app-match-editor',
    templateUrl: './match-editor.component.html',
    styleUrls: ['./match-editor.component.scss'],
})
export class MatchEditorComponent implements OnInit {

    fields: string[] = [
        'Field 1A',
        'Field 1B',
        'Field 2A',
        'Field 2B',
        'Field 3A',
        'Field 3B',
        'Outdoor A',
        'Outdoor B',
        'Field 4A',
        'Field 4B'
    ];
    selectedField: string = this.fields[0];
    matches: Match[];
    matchesByField: Match[] = [];
    selectedMatch: Match;

    constructor(private db: AngularFirestore) {
    }

    ngOnInit() {
        this.db.collection<Match>('matches/').snapshotChanges()
            .subscribe(value => {
                this.matches = value.map(a => {
                    const data = a.payload.doc.data() as Match;
                    const id = a.payload.doc.id;
                    return { id, ...data };
                });

                this.matchesByField = this.matches.filter(value => value.field === this.selectedField);
                this.selectedMatch = this.matches[0];
            });
    }

    fieldSelected($event) {
        const val = $event.value;
        this.selectedMatch = undefined;
        this.matchesByField = this.matches.filter(value => value.field === val);
        console.log(this.matchesByField);
    }

    update() {
        const id = this.selectedMatch.id;
        // todo update is causing selectedMatch to return to the first entry
        this.db.doc<Match>('matches/' + id).update(this.selectedMatch)
            .then(value => console.log(value))
            .catch(reason => console.log(reason));
    }

    generateMatchName(match: Match) {
        return match.team1 + ' vs. ' + match.team2;
    }

}
