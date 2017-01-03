import {Injectable}     from '@angular/core';
import {Http, Response} from '@angular/http';
import {Series}           from '../model/series';
import {Observable} from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class SeriesDetailService {
    constructor(private http: Http) {}

    getSeries(id: number){
        let seriesUrl = 'http://localhost:4200/api/series/' + id;
        return this.http.get(seriesUrl).map(this.parseData).catch(this.handleError);
    }

    private parseData(res: Response){
        let series:Series = res.json();
        return series;
    }

    private handleError(res: any){
        return Observable.throw(res);
    }
}