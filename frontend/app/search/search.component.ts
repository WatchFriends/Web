import { Component, ViewEncapsulation, Input } from '@angular/core';
import { ApiService } from '../services';
import { Series, Page, FollowedSeries, User, Name } from '../models';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class SearchComponent {

    seriesListDisplay: String = 'block';
    usersDisplay: String = 'none';

    @Input() series: FollowedSeries[];
    @Input() users : User[] = [
         {            
            picture: 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/14051786_1146069705449340_95700626649935794_n.jpg?oh=04be87d50b50a66ce9b42022df8b2fe5&oe=58E04019',
            name: new Name("Walking", null, "Zyde"),
            id: "0",
            email:""
        },
        {
            picture: 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/13669143_10208452039593036_5304103475273177345_n.jpg?oh=8491f29f569abc9cc00c893e65d2fddf&oe=58E4993F',
            name: new Name("Jasper", null, "De Walker"),
            id: "0",
            email:""
        },
        {
            picture: 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/11039195_10203824854083815_2557549902659964070_n.jpg?oh=457660b7b09f23754e24625e56da4abb&oe=58D612F5',
            name: new Name("Michiel", null, "Walker"),
            id: "0",
            email:""
        },
        {
            picture: 'https://avatars0.githubusercontent.com/u/16222780?v=3&s=400',
            name: new Name("Hein", null, "Walkerino"),
            id: "0",
            email:""
        },
        {
            picture: 'https://scontent-bru2-1.xx.fbcdn.net/v/t1.0-9/11836866_10206094665699493_6572247882328430829_n.jpg?oh=675b607a032e28da8c56a3d46433fa71&oe=58E029DA',
            name: new Name("Walking", null, "Bril"),
            id: "0",
            email:""
        }
    ];
    page = 0;
    totalPages = 1;
    totalResults = 0;
    query: string;
    bgimage: 'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';

    constructor(private route: ActivatedRoute, private api: ApiService) {
        route.params.subscribe(params => {
            this.query = params['query'];
            this.series = new Array<FollowedSeries>();
            this.page = 0;
            //this.users = new Array<User>();
            this.loadmore();
            this.api.searchUsers(this.query).subscribe(value => this.users = value, console.warn);
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
