
export interface Player {
    id: string;
    name: string;
    nationality: string;
    teams: number[];
    imageUrl: any;
    jersey: number;
    position: string;
    appearances: number;
    goals: number;
    pog: string;
    goalsAgainst: string; // position == goalkeeper only
    yellowCards: string;
    redCards: string;

}
