export interface allTournaments {
    data: tournamentObj[]
    total: number

}
export interface teamsInterface {
    players: string[],
    id: string,
    sport: string | string[],
    teamName: string,
    profile:string
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
}

export interface TotalTeamsInterface {
    data: SingleTeamInterface[],
    total: number
}
export interface SingleTeamInterface {
    players: string[],
    sport: string,
    teamName: string,

}
export interface poolMatchesInterface {
    poolIndex: string,
    teams: SingleTeamInterface[]
}
