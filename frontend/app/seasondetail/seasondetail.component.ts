import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services';
import { Season, Series } from '../models';
import { ActivatedRoute } from '@angular/router';

@Component({
    templateUrl: './seasondetail.component.html'
})
export class SeasonDetailComponent implements OnInit {

    public season: Season;
    public series: Series;
    public id: number;
    public seasonId: number;

    constructor(private api: ApiService, private route: ActivatedRoute) {
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
        this.api.getSeason(this.id, this.seasonId).subscribe((season: Season) => this.season = season, console.error);
        this.api.getSeries(this.id).subscribe((series: Series) => this.series = series, console.error);
    }
}
