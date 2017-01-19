import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../services';
import { Series, Page, User, Name } from '../models';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
   // encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

    seriesListDisplay: String = 'block';
    usersDisplay: String = 'none';

    series= new Array<Series>();
    @Input() users: User[];
    page: Page<Series>;
    query: string;
    bgimage: 'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';
    searchUrl: string;

    constructor(private route: ActivatedRoute, private api: ApiService) {
        route.params.subscribe(params => {
            this.query = params['query'];
            this.api.searchUsers(this.query).subscribe(value => this.users = value);
            this.api.searchSeries(this.query, 1).subscribe(value => this.page = value);
            this.searchUrl = `series/search/${this.query}`;
        });
    }
    
    changeContent(menu: Number) {

        let usersMenu = document.querySelector('a[data-hover="Users"]'),
            serieListMenu = document.querySelector('a[data-hover="Series"]');

        switch (menu) {
            case 0:
                this.seriesListDisplay = 'block';
                this.usersDisplay = 'none';

                usersMenu.classList.remove('active');
                serieListMenu.classList.add('active');

                break;
            case 1:
                this.seriesListDisplay = 'none';
                this.usersDisplay = 'block';

                usersMenu.classList.add('active');
                serieListMenu.classList.remove('active');
                break;
            default:
                this.seriesListDisplay = 'block';
                this.usersDisplay = 'none';

                usersMenu.classList.add('active');
                serieListMenu.classList.remove('active');
                break;

        }
    }
}
