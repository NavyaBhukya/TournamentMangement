import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.scss']
})
export class FeaturesComponent {
constructor(private route:Router){}
  public navigateTo(){
    try {
      console.log('navigate players');
      
      this.route.navigate(['/features/players'])
    } catch (error) {
      
    }
  }
}
