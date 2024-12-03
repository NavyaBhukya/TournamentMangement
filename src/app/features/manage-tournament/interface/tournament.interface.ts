export interface allTournaments {
    _id: string
    name: string
    description: string
    sport: string
    teams: string[]
    format: string
    pool: number,
    profile: string,
    startDate:string,
    endDate:string,
    maxTeams:number,
    createdAt: string
    updatedAt: string
    __v: number
}
export interface teamsInterface {
    players:string[],
    id:string,
    sport:string | string[],
    teamName:string
}