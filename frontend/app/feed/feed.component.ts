import { Component, OnInit } from '@angular/core';
import { ApiService, SocketService, UserService } from '../services';
import { WFEventsPage } from '../models';

@Component({
    templateUrl: './feed.component.html'
})

export class FeedComponent implements OnInit {
    public events: WFEventsPage;
    public alertDisplay = 'none';
    public count = 0;
    public page = 1;

    constructor(private api: ApiService, private socketsvc: SocketService, private usersvc: UserService) { }

    ngOnInit() {
        this.loadFeed();
        this.socketsvc.socket.on('message', function (data) {
            this.api.getFollower(data.userId, this.usersvc.id)
                .subscribe(
                since => {
                    if (since !== null) {
                        this.updateNotification();
                    }
                },
                console.error);
        }.bind(this));
    }

    private loadFeed() {
        if (this.page === 1) {
            this.api.getFeed(this.page)
                .subscribe(
                    feed => this.events = feed,
                    console.error
                );
        } else {
            this.api.getFeed(this.page)
                .subscribe(
                    feed => this.events.docs = this.events.docs.concat(feed.docs),
                    console.error
                );
        }
    }

    public loadMore() {
        if (this.page < this.events.pages) {
            this.page++;
            this.loadFeed();
        }
    }

    private updateNotification() {
        this.alertDisplay = 'block';
        this.count++;
        let alert = document.querySelector('a[class="alert-link"]');
        alert.innerHTML = 'You have ' + this.count + ' new notification' + (this.count > 1 ? 's.' : '.');
    }

    public updateFeed() {
        this.alertDisplay = 'none';
        this.count = 0;
        this.page = 1;
        this.loadFeed();
    }
}