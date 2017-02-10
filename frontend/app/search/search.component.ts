import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../services';
import { Series, Page, User } from '../models';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent {

    public users: User[];
    public page: Page<Series>;
    public query: string;
    public searchUrl: string;

    constructor(private route: ActivatedRoute, private api: ApiService) {
        route.params.subscribe(params => {
            this.query = params['query'];
            this.api.searchUsers(this.query).subscribe(value => this.users = value);
            this.api.searchSeries(this.query, 1).subscribe(value => this.page = value);
            this.searchUrl = `series/search/${this.query}`;
        });
    }
}
