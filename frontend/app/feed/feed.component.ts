import {Component, OnInit} from '@angular/core';
import {ApiService} from '../services';
import * as io from 'socket.io-client'
import {WFEvent} from "../models/wfevent";

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    events: WFEvent[];
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
            .subscribe(values => this.events = values, console.error);
    }
}