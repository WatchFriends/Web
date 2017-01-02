import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { ServerError } from "./server-error";
import { UserService } from "./user.service"

@Injectable()
export class ApiService {

    private dataHeaders = new Headers({ 'Content-Type': 'application/vnd.api+json' });
    private dataOptions = new RequestOptions({ headers: this.dataHeaders, withCredentials: true });

    constructor(private http: Http, private user: UserService) { }

    tokenfyPost = data => {
        var token = this.user.token;
        if (token) data.access_token = token;
        return JSON.stringify(data);
    };

    tokenfyGet = (url: string) => {
        return `${url}${url.indexOf('?') > 0 ? '&' : '?'}access_token=${this.user.token}`;
    }

    private catch = res => Observable.throw(<ServerError>res.json());

    post(url: string, data: any) {
        return this.http.post(url, this.tokenfyPost(data), this.dataOptions)
            .catch(this.catch);
    }

    search(query) {
        return this.http.get(this.tokenfyGet(`api/series/search?query=${query}`))
            .catch(this.catch);
    }

    achievements() {
        return this.http.get(this.tokenfyGet(`api/series/achievement`))
            .catch(this.catch);
    }
}