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
    // Tournaments
    // GET
    public getAllTournaments(): Observable<allTournaments[]> {
        return this.http.get<allTournaments[]>(`${this.apiUrl}tournaments`)
    }
    // POST
    public postTournaments(postTour: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}tournaments`, postTour)
    }
    // PUT
    public updateTournaments(id: string, postTour: any): Observable<any[]> {
        return this.http.put<any>(`${this.apiUrl}tournaments/${id}`, postTour)
    }
    // DELTE
    public deleteTournament(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}tournaments/${id}`)
    }
    // Upload Profile Image
    public uploadProfileImage(file: File): Observable<{ message: string; url: string }> {
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<{ message: string; url: string }>(`${this.apiUrl}upload-profile`, formData);
    }
    //Get all players
    public getallPlayers(): Observable<allplayers[]> {
        return this.http.get<allplayers[]>(`${this.apiUrl}players`)
    }
    // Post  Tournaments
    public postPlayers(postPlayer: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}players`, postPlayer)
    }
    public updatePlayers(id: any, updateplayer: any): Observable<any[]> {
        return this.http.put<any[]>(`${this.apiUrl}players/${id}`, updateplayer)
    }
    public deletePlayers(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}players/${id}`)
    }
    public getAllTeams(page?:number,pageSize?:number):Observable<any>{
        return this.http.get<any>(`${this.apiUrl}teams?page=${page}&limit=${pageSize}`)
    }
    public postTeams(postTeams:any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}teams`,postTeams)
    }
    public updateTeams(id:any ,updateplayer:any):Observable<any[]>{
        return this.http.put<any[]>(`${this.apiUrl}teams/${id}`,updateplayer)
    }
    public deleteams(id:number):Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}teams/${id}`)
    }
    
}