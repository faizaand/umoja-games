
export interface Player {
    id: string;
    name: string;
    nationality: string;
    team: number;
    imageUrl: string;
    jersey: number;
    position: string;
    appearances: number;
    goals: number;
    playerOfGame: string;
    goalsAgainst: string; // position == goalkeeper only
    yellowCards: string;
    redCards: string;

}
