import { Component, Input, OnInit } from '@angular/core';
import { ApiService, UserService, SocketService } from '../../services';
import { Page, Season } from '../../models';

@Component({
    templateUrl: './seasons.component.html',
    styleUrls: ['../sheared.component.scss'],
    selector: 'wf-seasons'
})
export class SeasonsComponent implements OnInit {
    @Input() public seasons: Season[];
    @Input() public seriesId: number;

    constructor(private user: UserService, private socketsvc: SocketService) {
    }

    ngOnInit() {}
}
