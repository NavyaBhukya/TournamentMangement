import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { allTournaments } from "../features/manage-tournament/interface/tournament.interface";
import { allplayers } from "../features/manage-players/interfaces/player.interface";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    private apiUrl = environment.baseUrl
// Get all Tournaments
    public getAllTournaments(): Observable<allTournaments[]> {
        return this.http.get<allTournaments[]>(`${this.apiUrl}tournaments`)
    }
    //Get all players
    public getallPlayers():Observable<allplayers[]> {
        return this.http.get<allplayers[]>(`${this.apiUrl}players`)
    }
}