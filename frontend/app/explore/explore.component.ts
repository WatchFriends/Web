import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services';
import { Page, List, Series } from '../models';

@Component({
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent implements OnInit {

    lists: List[];

    constructor(private api: ApiService) { }

    ngOnInit() {
        this.api.getLists().subscribe(lists => 
            console.log(this.lists = lists.sort((a, b) => a.name.localeCompare(b.name)))
        );
    }
}
