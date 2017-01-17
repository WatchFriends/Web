import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from '../services';
import {UserEvent} from "../models/userEvent";
import * as io from 'socket.io-client'

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    feed: UserEvent;
    socket: any = null;

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.loadFeed();
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('message', function (data) {
            console.log('it works!');
        }.bind(this));
    }

    private loadFeed() {
        this.api.getFeed()
            .subscribe(value => this.feed = value, console.error);
    }
}