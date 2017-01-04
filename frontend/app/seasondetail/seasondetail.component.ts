import {Component, OnInit} from "@angular/core";
import {ApiService} from "../services/api.service";

import {Season} from '../model/season';
import {ActivatedRoute} from "@angular/router";

@Component({
    templateUrl: './seasondetail.component.html'
})

export class SeasonDetailComponent implements OnInit {
    season: Season;
    id: number;
    seasonId: number;

    constructor(private svc: ApiService, private route: ActivatedRoute) {
        this.route.params.subscribe(params => {
            this.id = +params['id'];
            this.seasonId = +params['seasonid'];
        })
    }

    ngOnInit() {
        this.loadSeries();
    }

    loadSeries() {
        this.svc.getSeason(this.id, this.seasonId)
            .subscribe(
                (season: Season) => this.season = season, console.error
            );
    }
}