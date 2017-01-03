import {Component, OnInit, Input} from "@angular/core";
import {SeriesDetailService} from '../services/seriesdetail.service';

import {Series} from '../model/series';

@Component({
    templateUrl: './seriesdetail.component.html'
})

export class SeriesDetailComponent implements OnInit {
    series: Series;

    constructor(private seriesDetailService: SeriesDetailService) {
    }

    ngOnInit() {
        this.loadSeries();
    }

    loadSeries() {
        this.seriesDetailService.getSeries(1222)
            .subscribe(
                (series: Series) => this.series = series,
                err => {
                    console.log(err);
                }
            );
    }

}