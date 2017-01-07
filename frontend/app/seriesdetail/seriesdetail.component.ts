import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../services';
import { FollowedSeries, Series } from '../models';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './seriesdetail.component.html'
})

export class SeriesDetailComponent implements OnInit {
    series: Series;
    id: number;

    constructor(private api: ApiService, private router: Router, private route: ActivatedRoute) {
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
            value => this.series = value.series,
            console.error
            );
    }
}