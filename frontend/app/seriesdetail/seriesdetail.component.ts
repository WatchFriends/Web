import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services';
import { Series } from '../models';
import { Router, ActivatedRoute } from '@angular/router';
import { SocketService } from '../services';

@Component({
    templateUrl: './seriesdetail.component.html',
    styleUrls: ['./seriesdetail.component.scss']
})

export class SeriesDetailComponent implements OnInit {
    series: Series;
    id: number;
    following_change_active: number;


    constructor(private api: ApiService, private router: Router, private route: ActivatedRoute, private socketsvc: SocketService) {
        route.params.subscribe(params => {
            this.id = +params['id'];
        });
    }

    ngOnInit() {
        this.loadSeries();
    }

    loadSeries() {
        this.api.getSeries(this.id)
            .subscribe(
            value => this.series = value,
            console.error
            );
    }

    changeFollowed() {
        if (!this.following_change_active) {
            this.series.following = !this.series.following;
            this.following_change_active = 1;
            this.api.addEvent({
                seriesId: this.series.id,
                seriesName: this.series.name,
                following: this.series.following
            }).subscribe();
            this.socketsvc.sendEventSocket();
            this.api.updateFollowedSeries(this.series.id, { following: this.series.following })
                .subscribe(ok => this.following_change_active = undefined);
        }
    }
}