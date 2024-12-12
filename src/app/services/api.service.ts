import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { allTournaments } from "../features/manage-tournament/interface/tournament.interface";
import { allplayers } from "../features/manage-players/interfaces/player.interface";
import { UserInterface } from "../features/dashboard/interface/common.interface";
import { LoginUserData } from "../auth/interface/auth.interface";

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private http: HttpClient) { }
    private apiUrl = environment.baseUrl
    // Tournaments
    // GET
    public getAllTournaments(page?: number, pageSize?: number): Observable<allTournaments[]> {
        return this.http.get<allTournaments[]>(`${this.apiUrl}tournament?page=${page}&limit=${pageSize}`)
    }
    // GET single tournament
    public getSingleTournament(id: string): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}tournament/${id}`)
    }
    // POST
    public postTournaments(postTour: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}tournament`, postTour)
    }
    // PUT
    public updateTournaments(id: string, postTour: any): Observable<any[]> {
        return this.http.put<any>(`${this.apiUrl}tournament/${id}`, postTour)
    }
    // DELTE
    public deleteTournament(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}tournament/${id}`)
    }
    // Upload Profile Image
    public uploadProfileImage(file: File): Observable<{ message: string; url: string }> {
        const formData = new FormData();
        formData.append('image', file);
        return this.http.post<{ message: string; url: string }>(`${this.apiUrl}upload-profile`, formData);
    }
    // Get User by ID
    public getUserById(id: string): Observable<{ data: UserInterface }> {
        return this.http.get<{ data: UserInterface }>(`${this.apiUrl}user/${id}`)
    }
    // Update User data based on ID
    public updateUserById(id: string, userData: UserInterface): Observable<{ message: string, data: LoginUserData }> {
        return this.http.put<{ message: string, data: LoginUserData }>(`${this.apiUrl}user/${id}`, userData)
    }
    // Delete user account based on ID 
    public deleteUserAccount(id: string): Observable<{ message: string }> {
        return this.http.delete<{ message: string }>(`${this.apiUrl}user/${id}`)
    }
    //Get all players
    public getallPlayers(page?: number, pageSize?: number): Observable<allplayers[]> {
        return this.http.get<allplayers[]>(`${this.apiUrl}player?page=${page}&limit=${pageSize}`)
    }
    // Post  Tournaments
    public postPlayers(postPlayer: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}player`, postPlayer)
    }
    public updatePlayers(id: any, updateplayer: any): Observable<any[]> {
        return this.http.put<any[]>(`${this.apiUrl}player/${id}`, updateplayer)
    }
    public deletePlayers(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}player/${id}`)
    }
    public getAllTeams(page?: number, pageSize?: number): Observable<any> {
        return this.http.get<any>(`${this.apiUrl}team?page=${page}&limit=${pageSize}`)
    }
    public postTeams(postTeams: any): Observable<any[]> {
        return this.http.post<any[]>(`${this.apiUrl}team`, postTeams)
    }
    public updateTeams(id: any, updateplayer: any): Observable<any[]> {
        return this.http.put<any[]>(`${this.apiUrl}team/${id}`, updateplayer)
    }
    public deleteams(id: number): Observable<any> {
        return this.http.delete<any>(`${this.apiUrl}team/${id}`)
    }

}