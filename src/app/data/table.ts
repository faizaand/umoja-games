export interface Standings {
    // used in League Standings
    pos: number;
    name: string;
    gamesPlayed: number;
    wins: number;
    losses: number;
    draws: number;
    points: number;
    ppg: number; // points per game
    gf: number; // goals for
    gfpg: number; // goals for per game
    ga: number;
    gapg: number;
    gd: number;
    gdpg: number;
    cards: number;
    cpg: number; // cards per game
    streak: number;
    // did not include 'nextopponent'
}

export interface Table {
    id: number;
    categories: string[];
    title: string;
    teams: Standings[];
}
