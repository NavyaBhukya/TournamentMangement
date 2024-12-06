export interface allTournaments {
    data: tournamentObj[]
    total: number

}
export interface teamsInterface {
    players: string[],
    _id: string,
    sport: string | string[],
    teamName: string,
    profile: string
}
export interface tournamentObj {
    _id: string
    name: string
    description: string
    sport: string
    teams: teamsInterface[]
    format: string
    pools: number,
    profile: string,
    startDate: string,
    endDate: string,
    maxTeams: number,
    createdAt: string
    updatedAt: string
    __v: number
    poolMatches: poolMatchesInterface[] | null
    formatMatches: formatSingleMatch[] | null
}
interface formatSingleMatch {
    match: string,
    round: number,
    team1: {
        players: null | [],
        profile: string,
        sport: string,
        teamName: string
    },
    team2: {
        players: null | [],
        profile: string,
        sport: string,
        teamName: string
    }
}

export interface TotalTeamsInterface {
    data: SingleTeamInterface[],
    total: number
}
export interface SingleTeamInterface {
    players: string[],
    sport: string,
    teamName: string,
    profile: string
    _id: string

}
export interface poolMatchesInterface {
    poolIndex: string,
    teams: SingleTeamInterface[]
}
