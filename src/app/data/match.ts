import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Match {
    team1: string;
    team2: string;
    score1: number;
    score2: number;
    category: string;
    redCards: number;
    yellowCards: number;
    date: Timestamp;
    endDate: Timestamp;
    ground: string;
    editing: boolean;
}
