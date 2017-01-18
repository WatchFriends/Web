import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ApiService} from '../services';
import {Season} from '../models';
import {ActivatedRoute} from '@angular/router';
import {Series} from "../models/series";

@Component({
    templateUrl: './seasondetail.component.html',
    encapsulation: ViewEncapsulation.None
})

export class SeasonDetailComponent implements OnInit {
    series: Series;
    season: Season;
    id: number;
    seasonId: number;

    constructor(private svc: ApiService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.seasonId = +params['seasonId'];
        })
    }

    ngOnInit() {
        this.loadSeries();
    }

    loadSeries() {
        this.svc.getSeries(this.id)
            .subscribe(
                (series: Series) =>
                    this.series = series, console.error
            );
        this.svc.getSeason(this.id, this.seasonId)
            .subscribe(
                (season: Season) => { console.log(season);
                    this.season = season}, console.error
            );
    }
}