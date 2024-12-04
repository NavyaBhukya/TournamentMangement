import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { tournamentObj } from '../../interface/tournament.interface';

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
    this.apiService.getSingleTournament(id).subscribe((res: { data: tournamentObj[] }) => {
      this.tourObj = res.data[0]
      console.log(this.tourObj);
    })
  }
  public goBack(): void {
    this.loc.back()
  }
}
