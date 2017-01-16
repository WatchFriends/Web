import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from '../services';
import {UserEvent} from "../models/userEvent";

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    feed: UserEvent;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.loadFeed();
    }

    private loadFeed() {
        this.api.getFeed()
            .subscribe(value => this.feed = value, console.error);
    }
}