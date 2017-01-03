import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";
import { ServerError } from "./server-error";
import { UserService } from "./user.service"

@Injectable()
export class ApiService {

    constructor(private http: Http, private user: UserService) { }

    private catch = res => Observable.throw(<ServerError>res.json());

    //adds token to headers
    post(url: string, data: any) {
        const options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/vnd.api+json' }) });
        options.headers.set('Authorization', `Bearer ${this.user.token}`);
        return this.http.post(url, JSON.stringify(data), options)
            .catch(this.catch);
    }

    //adds token to headers
    get(url: string) {
        return this.http.get(url, { headers: new Headers({ 'Authorization ': `Bearer ${this.user.token}` }) })
            .catch(this.catch);
    }

    search(query) {
        return this.get(`api/series/search?query=${query}`)
            .catch(this.catch);
    }

    achievements() {
        return this.http.get(`api/series/achievement`)
            .catch(this.catch);
    }

    getUserData(id: string) {
        return this.get(`api/users/${id}`)
            .catch(this.catch);
    }
}