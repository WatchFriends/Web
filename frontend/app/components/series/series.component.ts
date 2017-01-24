import {Component, Input, OnInit} from '@angular/core';
import {ApiService, UserService, SocketService} from '../../services';
import {Page, Series} from '../../models';

@Component({
    templateUrl: './series.component.html',
    styleUrls: ['./series.component.scss'],
    selector: 'wfseries'
})
export class Wfseries implements OnInit{
    @Input() series: Series[];
    @Input() page: number;
    @Input() totalPages: number;
    @Input() apiUrl: string;

    constructor(private api: ApiService, private user: UserService, private socketsvc: SocketService) {
    }

    ngOnInit(){
    }

    changeFollowed(series) {
        if (!series.following_change_active) {
            series.following = !series.following;
            series.following_change_active = 1;
            this.api.addEvent({seriesId: series.id, seriesName: series.name, following: series.following}).subscribe();
            this.socketsvc.sendEventSocket();
            this.api.updateFollowedSeries(series.id, {following: series.following}).subscribe(ok => series.following_change_active = undefined);
        }
    }

    loadmore() {
        if (this.page < this.totalPages) {
            this.api.get(`api/${this.apiUrl}/${++this.page}`).subscribe((value: Page<Series>) => {
                this.series = this.series.concat(value.results);
                this.totalPages = value.totalPages;
            });
        }
    }
}