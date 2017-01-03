import {Component, OnInit, Input} from "@angular/core";
import {SeriesDetailService} from '../services/seriesdetail.service';

import {Series} from '../model/series';
import {Router, ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './seriesdetail.component.html'
})

export class SeriesDetailComponent implements OnInit {
    series: Series;
    id: number;

    constructor(private seriesDetailService: SeriesDetailService, private router: Router, private route: ActivatedRoute) {
        this.route.params.subscribe(params =>{
            this.id = +params['id'];
        })
    }

    ngOnInit() {
        this.loadSeries();
    }

    loadSeries() {
        this.seriesDetailService.getSeries(this.id)
            .subscribe(
                (series: Series) => this.series = series,
                err => {
                    console.log(err);
                }
            );
    }
}