import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { ServerError } from ".";

@Injectable()
export class ApiService {

    constructor(private http: Http) { }

    private dataHeaders = new Headers({ 'Content-Type': 'application/vnd.api+json' });
    private options = new RequestOptions({ headers: this.dataHeaders, withCredentials: true });

    private token = () => localStorage.getItem("access-token");

    tokenfy = data => {
        var token = this.token();
        if (token) data.access_token = token;
        return JSON.stringify(data);
    };

    private catch = res => Observable.throw(<ServerError>res.json());

    post(url: string, data: any) {
        return this.http.post(url, this.tokenfy(data), this.options)
            .catch(this.catch);
    }

    search(query) {
        return this.http.get(`api/series/search?query=${query}&access_token=${this.token()}`,this.options)
            .catch(this.catch);
    }

    achievements() {
        return this.http.get(`api/series/achievement?access_token=${this.token()}`,this.options)
            .catch(this.catch);
    }
}