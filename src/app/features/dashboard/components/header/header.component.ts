import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  public showUserProfile: boolean = false
  public uerProfile: string | null = null
  constructor(private route: Router, private commonService: CommonService) { }
  public userLogout() {
    localStorage.clear();
    this.commonService.showHeader.emit()
    this.route.navigate(['/login'])
  }
  public UserProfile(event: void) {
    this.showUserProfile = !this.showUserProfile
  }
  public getUserProfile(profile: string | null) {
    this.uerProfile = profile
  }
}
