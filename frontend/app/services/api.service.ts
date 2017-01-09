import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from 'rxjs';
import { ServerError } from './server-error';
import { UserService } from './user.service';
import { Follower, Season, Series, User, Page } from '../models';

@Injectable()
export class ApiService {

    constructor(private http: Http, private user: UserService) { }

    private catch = res => Observable.throw(<ServerError>res.json());

    // adds token to headers
    post<type>(url: string, data: any): Observable<type> {
        const options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/vnd.api+json' }) });
        options.headers.set('Authorization', `Bearer ${this.user.token}`);
        return this.http.post(url, JSON.stringify(data), options)
            .map(res => <type>res.json())
            .catch(this.catch);
    }

    // adds token to headers
    get<type>(url: string): Observable<type> {
        return this.http.get(url, { headers: new Headers({ 'Authorization': `Bearer ${this.user.token}` }) })
            .map(res => <type>res.json())
            .catch(this.catch);
    }

    put<type>(url: string, data: any): Observable<type> {
        const options = new RequestOptions({ headers: new Headers({ 'Content-Type': 'application/vnd.api+json' }) });
        options.headers.set('Authorization', `Bearer ${this.user.token}`);
        return this.http.put(url, JSON.stringify(data), options)
            .map(res => <type>res.json())
            .catch(this.catch);
    }

    // routes
    search(query, page) {
        return this.get<Page>(`api/series/search/${query}/${page}`);
    }

    getAchievements() {
        return this.http.get(`api/series/achievement`);
    }

    getUser(id: string) {
        return this.get<User>(`api/user/${id}`);
    }

    getSeries(id: number) {
        return this.get<Series>(`api/series/${id}`);
    }

    getSeason(id: number, seasonId: number) {
        return this.get<Season>(`api/series/${id}/season/${seasonId}`);
    }

    getFollowedSeries(user: string = null) {
        return this.get<Series[]>(user ? `api/followed?user=${user}` : 'api/followed');
    }

    getFollowers(user: string = null) {
        return this.get<Follower[]>(user ? `api/user/followers?user=${user}` : 'api/user/followers');
    }

    updateFollowed(series: number, data: { following: boolean, rating?: number, user?: string }) {
        return this.put(`api/followed/${series}`, data);
    }

    updateFollowing(user: string, following: boolean) {
        return this.put(`api/following/${user}`, { following });
    }

    getLists() {
        return this.get(`api/list`);
    }

    getPopular(page: number) {
        return this.get<Page>(`api/series/popular/${page}`);
    }
}
