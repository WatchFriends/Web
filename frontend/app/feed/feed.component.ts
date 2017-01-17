import {Component, OnInit, Input} from '@angular/core';
import {ApiService} from '../services';
import {UserEvent} from "../models/userEvent";
import * as io from 'socket.io-client'

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    events: UserEvent[];
    socket: any = null;
    messages = [];

    constructor(private api: ApiService) {
    }

    ngOnInit() {
        this.loadFeed();
        this.eventToMessages();
        this.socket = io.connect('http://localhost:3000');
        this.socket.on('message', function (data) {
            console.log('it works!');
        }.bind(this));
    }

    private loadFeed() {
        this.api.getFeed()
            .subscribe(values => this.events = values, console.error);
        /*
        for (let i = 0, len = this.events.length; i < len; i++) {
            if (this.events[i].params.friendId !== '') {
                let message = {
                    message: this.events[i].userId + ' is now following ' + this.events[i].params.friendId + '.',
                    url: '',
                    time: this.events[i].time
                };
                this.messages.push(message);
            } else if(this.events[i].params.rating !== 0) {
                let message = {
                    message: this.events[i].userId + ' gave ' + this.events[i].params.seriesId + ' a rating of ' + this.events[i].params.rating + ' stars',
                    url: '',
                    time: this.events[i].time
                };
                this.messages.push(message);
            } else if (this.events[i].params.watch !)
        }
        */
    }

    private eventToMessages() {

    }
}