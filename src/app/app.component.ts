import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CommonService } from './services/common.service';
import { LoaderService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public isLoggedIn: boolean = false;
  public isLoaderVisible = false;

  constructor(private commonServ: CommonService,public spinnerloading:LoaderService) { }
  ngOnInit(): void {
    this.getHeader()
    this.isLoggedIn = localStorage.getItem('token') ? true : false
  }
  private getHeader(): void {
    this.commonServ.showHeader.subscribe(() => {

      this.isLoggedIn = localStorage.getItem('token') ? true : false
      console.log(this.isLoggedIn,'showing header');
      

    })
  }
}
