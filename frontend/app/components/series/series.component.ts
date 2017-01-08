import { Component, Input } from '@angular/core';
import { Series } from '../../models/series';
import { ApiService } from '../../services';
import { Page } from '../../models';

@Component({
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
    selector: 'wfseries'
})

export class Wfseries {
    @Input() series: Series[];
    @Input() page: number;
    @Input() totalPages: number;
    @Input() apiUrl: string;

    constructor(private api: ApiService) { }

    loadmore() {

        if (this.page < this.totalPages) {
            this.api.get(`api/${this.apiUrl}/${++this.page}`).subscribe((value: Page) => {

                console.log(`${this.apiUrl}/${this.page}`);
                this.series = this.series.concat(value.results);
                this.totalPages = value.total_pages;
                // this.totalResults = value.total_results;
            });
        }
    }
}