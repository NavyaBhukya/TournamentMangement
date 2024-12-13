import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { SingleTeamInterface, teamsInterface, tournamentObj } from '../../interface/tournament.interface';

@Component({
  selector: 'app-tournament-details',
  templateUrl: './tournament-details.component.html',
  styleUrls: ['./tournament-details.component.scss']
})
export class TournamentDetailsComponent implements OnInit {
  private tourId: string = '';
  public tourObj: tournamentObj | null = null
  constructor(private loc: Location, private route: ActivatedRoute, private apiService: ApiService) { }
  ngOnInit(): void {
    this.tourId = this.route.snapshot.paramMap.get('id') || ''
    this.getTourById(this.tourId)
  }
  private getTourById(id: string) {
    this.apiService.getSingleTournament(id).subscribe({
      next: (res: { data: tournamentObj[] }) => {
        this.tourObj = res.data[0]
      }
    })
  }
  public goBack(): void {
    this.loc.back()
  }
  public trackByTeam(index: number, team: SingleTeamInterface): string | number {
    return team._id || index
  }
  public trackBySingleTeam(index: number, team: teamsInterface): string | number {
    return team._id || index
  }
}
