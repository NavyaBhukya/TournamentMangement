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
    // Post  Tournaments
    public postTournaments(postTour: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}tournaments`, postTour)
    }
    // Upload Profile Image
    public uploadProfileImage(file: File): Observable<{ message: string; url: string }> {
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<{ message: string; url: string }>(`${this.apiUrl}upload-profile`, formData);
    }
    //Get all players
    public getallPlayers():Observable<allplayers[]> {
        return this.http.get<allplayers[]>(`${this.apiUrl}players`)
    }
    // Post  Tournaments
    public postPlayers(postPlayer:any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}players`,postPlayer)
    }
    public updatePlayers(id:any ,updateplayer:any):Observable<any[]>{
        return this.http.put<any[]>(`${this.apiUrl}players/${id}`,updateplayer)
    }
    public deletePlayers(id:number):Observable<any>{
        return this.http.delete<any>(`${this.apiUrl}players/${id}`)
    }
}