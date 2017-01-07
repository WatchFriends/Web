import { Component} from '@angular/core';
import { ApiService } from '../services';
import { Series } from '../model/series';
import { Page } from '../model/page';
import { List } from '../model/list';

@Component({
    templateUrl: './explore.component.html',
    styleUrls: ['./explore.component.scss']
})
export class ExploreComponent  {

    lists: List[];
    activeList: string;

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

    changeTab(tabName: string) {

        document.getElementById(this.activeList).style.display = "none";
        document.getElementById(tabName).style.display = "block";
        
        this.activeList = tabName;
    }

    loadmore(url: string) {

        for (let i = this.lists.length; i--;) {
            
            let list: List = this.lists[i];

            console.log(`${list.name}: ${list.page} of ${list.totalPages}`);

            if (list.apiRequest === url) {

                this.lists[i].page += 1;

                this.api.getUrl(`api/${url}/${list.page}`).subscribe((lists: Page) => {

                    for (let s = lists.results.length; s--;) {                    
                        this.lists[i].series.push(lists.results[s]);
                    }
                }); 
            }
        }
    }
}