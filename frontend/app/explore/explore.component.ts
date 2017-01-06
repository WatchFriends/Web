import { Component} from '@angular/core';
import { ApiService } from '../services';
import { Series } from '../model/series';
import { List } from '../model/list';
import { SeriesImagePipe } from '../pipes/series-image.pipe';

@Component({
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent  {

    lists: List[];
    activeList: String;

    constructor(private api: ApiService) { } 

    ngOnInit() {
        this.loadLists();
    }

    loadLists() {
        this.api.getLists().subscribe((lists: List[]) => {
            this.lists = lists;
            this.activeList = this.lists[0].name;
        });
    }
}