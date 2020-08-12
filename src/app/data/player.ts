
export interface Player {
    id: string;
    name: string;
    nationality: string;
    teams: number[];
    imageUrl: any;
    jersey: number;
    position: string;
    goalsAgainst: string; // position == goalkeeper only
    matches: Record<string, any>;
}
