import { Component} from '@angular/core';
import { ApiService } from '../services';
import { Series } from '../model/series';
import { Page } from '../model/page';
import { List } from '../model/list';
import { SeriesImagePipe } from '../pipes/series-image.pipe';

@Component({
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent  {

    lists: List[];
    activeList: string;
    page: number = 1;

    constructor(private api: ApiService) { } 

    ngOnInit() {
        this.loadLists();
    }

    loadLists() {
        this.api.getLists().subscribe((lists: List[]) => {
            this.lists = lists;
            this.activeList = this.lists[0].name.toString();
        });
    }

    changeTab(tabName: string) {

        document.getElementById(this.activeList).style.display = "none";
        document.getElementById(tabName).style.display = "block";
        
        this.activeList = tabName;
    }

    loadmore(url: string) {

        this.page += 1;
        this.api.getUrl(`api/${url}/${this.page}`).subscribe((lists: Page) => {

            for (var i = this.lists.length; i--;) {
                if (this.lists[i].apiRequest === url) {

                    for (var s = lists.results.length; s--;) {                    
                        this.lists[i].series.push(lists.results[s]);
                    }
                }
            }
        });
    }
}