import {Component, OnInit} from '@angular/core';
import {ApiService, SocketService} from '../services';
import {WFEvent} from "../models/wfevent";
import * as io from 'socket.io-client'

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    events: WFEvent[];
    socket: any = null;
    alertDisplay: String = 'none';
    count: number = 0;

    constructor(private api: ApiService, private socketsvc: SocketService) {
    }

    ngOnInit() {
        this.loadFeed();
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('message', function (data) {
            this.updateNotification();
        }.bind(this));
    }

    private loadFeed() {
        this.api.getFeed()
            .subscribe(values => this.events = values, console.error);
    }

    private updateNotification() {
        this.alertDisplay = 'block';
        this.count++;
        let alert = document.querySelector('a[class="alert-link"]');
        alert.innerHTML = 'You have ' + this.count + ' new notification' + (this.count > 1 ? 's.' : '.');
    }

    updateFeed(){
        this.alertDisplay = 'none';
        this.count = 0;
        this.loadFeed();
    }
}