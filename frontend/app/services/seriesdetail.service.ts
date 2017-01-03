// Imports
import {Injectable}     from '@angular/core';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import {Series}           from '../model/series';
import {Observable} from 'rxjs/Observable';

// Import RxJs required methods
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
        console.log(series);

        return series;
    }

    private handleError(res: any){
        console.error(res);
        return Observable.throw(res);
    }

    /*
    getSeries(): Observable<Series> {
        // ...using get request
        return this.http.get(this.seriesUrl)
        // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error.json().error || 'Server error'));
    }*/
}