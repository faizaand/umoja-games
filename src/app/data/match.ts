import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Match {
    id: string;
    team1: string;
    team1Id: string;
    team2: string;
    team2Id: string;
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
