import { Component, Input, OnInit } from '@angular/core';
import { ApiService, UserService, SocketService } from '../../services';
import { Page, Season } from '../../models';

@Component({
    templateUrl: './seasons.component.html',
    styleUrls: ['../sheared.component.scss'],
    selector: 'wfseasons'
})
export class WfSeasons implements OnInit {
    @Input() seasons: Season[];
    @Input() seriesId: number;

    constructor(private user: UserService, private socketsvc: SocketService) {
    }

    ngOnInit() {
    }

    // changeFollowed(series) {
    //     if (!series.following_change_active) {
    //         series.following = !series.following;
    //         series.following_change_active = 1;
    //         this.api.addEvent({seriesId: series.id, seriesName: series.name, following: series.following}).subscribe();
    //         this.socketsvc.sendEventSocket();
    //         this.api.updateFollowedSeries(series.id, {following: series.following}).subscribe(ok => series.following_change_active = undefined);
    //     }
    // }
}