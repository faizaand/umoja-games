
export interface Player {
    id: string;
    name: string;
    nationality: string;
    imageUrl: string;
    islamicCenter: string;
    jersey: number;
    position: string;
    appearances: number;
    goals: number;
    playerOfGame: string;
    goalsAgainst: string; // position == goalkeeper only
    yellowCards: string;
    redCards: string;

}
