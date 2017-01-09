import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../services';
import { Series, Page, User, Name } from '../models';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

    seriesListDisplay: String = 'block';
    usersDisplay: String = 'none';

    @Input() series: Series[];
    @Input() users: User[];
    page = 0;
    totalPages = 1;
    totalResults = 0;
    query: string;
    bgimage: 'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';
    searchUrl: string;

    constructor(private route: ActivatedRoute, private api: ApiService) {
        route.params.subscribe(params => {
            this.query = params['query'];
            this.api.searchUsers(this.query).subscribe(value => this.users = value, console.warn);
            this.series = new Array<Series>();
            this.loadmore();

            this.searchUrl = `series/search/${this.query}`;
        });
    }

    loadmore() {
        if (this.page < this.totalPages) {
            this.api.searchSeries(this.query, ++this.page).subscribe(value => {
                this.series = this.series.concat(value.results);
                this.totalPages = value.total_pages;
                this.totalResults = value.total_results;
            });
        }
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
