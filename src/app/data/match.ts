import * as firebase from 'firebase';
import Timestamp = firebase.firestore.Timestamp;

export interface Match {
    id: string;
    team1: MatchStats;
    team2: MatchStats;
    teams: number[];
    categories: string[];
    duration: number;
    date: string;
    field: string;
    liveEditing: boolean;
    hasEnded: boolean;
}

export interface MatchStats {
    id: number; // id of the team
    firstHalf: number;
    secondHalf: number;
    goals: number;
    yellowCards: number;
    redCards: number;
    outcome: string;
}
