import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services';
import { Season, Series } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './seasondetail.component.html'
})

export class SeasonDetailComponent implements OnInit {
    season: Season;
    series: Series;
    id: number;
    seasonId: number;

    constructor(private svc: ApiService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.seasonId = +params['seasonId'];

            console.log(`id: ${this.id} | seasonId: ${this.seasonId}`);
        });
    }

    ngOnInit() {
        this.loadSeries();
    }

    loadSeries() {
        this.svc.getSeason(this.id, this.seasonId).subscribe((season: Season) => this.season = season, console.error);
        this.svc.getSeries(this.id).subscribe((series: Series) => this.series = series, console.error);
    }
}