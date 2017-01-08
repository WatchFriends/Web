import { Component, Input } from '@angular/core';
import { Series } from '../../model/series';

@Component({
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
    selector: 'wfseries'
})

export class Wfseries {
    @Input() series: Series[];
    @Input() loadmore: Boolean;
}