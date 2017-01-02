import { Component, OnInit } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../services'

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  
  loading = false;

  constructor(router: Router, private user: UserService) {
    router.events.subscribe(this.routerEvent);
  }

  routerEvent(event) {
    if (event instanceof NavigationStart)
      this.loading = true;
    else if (event instanceof NavigationEnd)
      this.loading = true;
  }

  ngOnInit() {
  }

  errorMessage: any;

  loadPhotos(){

    // service aanmaken
    this.errorMessage = console.log("hello");

  }

}
