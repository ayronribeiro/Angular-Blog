import { Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  loader = true;


  constructor(private router: Router, private location: Location){
    this.location.replaceState(this.location.path(false));
    setTimeout(()=>{
      this.loader = false;
    },100);
  }

}
