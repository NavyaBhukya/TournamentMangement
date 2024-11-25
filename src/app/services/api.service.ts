import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { allTournaments } from "../features/manage-tournament/interface/tournament.interface";

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
}