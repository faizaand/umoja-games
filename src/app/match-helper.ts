// helper methods for matches

export function computeTeamTitles(team: string) {
    const teamSplit = team.split(' ');
    let title = '';
    let subtitle = '';
    if (teamSplit.length === 1) {
        title = teamSplit[0];
        subtitle = '';
    } else if (teamSplit.length === 2) {
        subtitle = teamSplit[0];
        title = teamSplit[1];
    } else {
        const part1 = teamSplit.slice(0, teamSplit.length - 2);
        const part2 = teamSplit.slice(teamSplit.length - 2);

        if (part2[1].length < 3) {
            // the last part of the name is under 3 letters so it'll probably fit
            subtitle = part1.join(' ');
            title = part2.join(' ');
        } else {
            subtitle = part1.join(' ') + ' ' + part2[0];
            title = part2[1];
        }
    }

    return {
        title, subtitle
    };
}

export function computeTimeString(matchStartTimestamp, matchEndTimestamp) {
    const matchStart = new Date(matchStartTimestamp.seconds * 1000);
    const matchEnd = matchEndTimestamp == null ? null : new Date(matchEndTimestamp * 1000);
    const now = new Date(2019, 7, 3, 15, 0, 0, 0);
    console.log(matchStart);
    console.log(matchEnd);
    console.log(now);

    /*
    if(beforeTheMatch) {
        if(today) {
            // starting at 3:30pm
        } else {
            // Sunday 3:30pm
        }
    }*/
}

