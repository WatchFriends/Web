import {Component, OnInit} from '@angular/core';
import {ApiService, SocketService} from '../services';
import * as io from 'socket.io-client'
import {WFEventsPage} from "../models/wfeventspage";

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    events: WFEventsPage;
    socket: any = null;
    alertDisplay: String = 'none';
    count: number = 0;
    page: number = 1;

    constructor(private api: ApiService, private socketsvc: SocketService) {
    }

    ngOnInit() {
        this.loadFeed(this.page);
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('message', function (data) {
            this.updateNotification();
        }.bind(this));
    }

    private loadFeed(page) {
        if (page === 1) {
            this.api.getFeed(page)
                .subscribe(feed =>
                    this.events = feed, console.error
                );
        } else {
            this.api.getFeed(page)
                .subscribe(feed =>
                    this.events.docs = this.events.docs.concat(feed.docs), console.error
                );
        }
    }

    loadMore() {
        if (this.page < this.events.pages) {
            this.page++;
            this.loadFeed(this.page);
        }
    }

    private updateNotification() {
        this.alertDisplay = 'block';
        this.count++;
        let alert = document.querySelector('a[class="alert-link"]');
        alert.innerHTML = 'You have ' + this.count + ' new notification' + (this.count > 1 ? 's.' : '.');
    }

    updateFeed() {
        this.alertDisplay = 'none';
        this.count = 0;
        this.page = 1;
        this.loadFeed(this.page);
    }
}