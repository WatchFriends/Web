import { Component } from '@angular/core';
import { NavigationStart, NavigationEnd, Router } from '@angular/router';
import { UserService, ApiService } from '../services';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  public loading = false;
  public isCollapsed = false;

  constructor(public router: Router, public user: UserService, public api: ApiService) {
    router.events.subscribe(this.routerEvent);
  }

  routerEvent(event) {
    if (event instanceof NavigationStart) {
      this.loading = true;
    } else if (event instanceof NavigationEnd) {
      this.loading = true;
    }
  }

  goToSearch(query: string) {
    this.router.navigate(['./search', query]);
  }
}
