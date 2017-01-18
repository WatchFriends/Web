import { Component} from '@angular/core';
import { ApiService } from '../services';
import { Page, List, Series } from '../models';

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
            this.lists = lists.sort((a,b) => a.name.localeCompare(b.name));
            this.activeList = this.lists[0].name;
        });
    }

    changeTab(tabName: string) {

        document.getElementById(this.activeList).style.display = "none";
        document.getElementById(tabName).style.display = "block";
        
        this.activeList = tabName;
    }
}