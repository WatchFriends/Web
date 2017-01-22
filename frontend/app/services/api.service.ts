import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {Observable} from 'rxjs';
import {ServerError} from './server-error';
import {UserService} from './user.service';
import {Follower, Season, Series, User, UserData, Page, WFEvent, WFEventsPage} from '../models';


@Injectable()
export class ApiService {

    constructor(private http: Http, private user: UserService) {
    }

    private catch = res => Observable.throw(<ServerError>res.json());

    // adds token to headers
    post<type>(url: string, data: any): Observable<type> {
        const options = new RequestOptions({headers: new Headers({'Content-Type': 'application/vnd.api+json'})});
        options.headers.set('Authorization', `Bearer ${this.user.token}`);
        return this.http.post(url, JSON.stringify(data), options)
            .map(res => <type>res.json())
            .catch(this.catch);
    }

    // adds token to headers
    get<type>(url: string): Observable<type> {
        return this.http.get(url, {headers: new Headers({'Authorization': `Bearer ${this.user.token}`})})
            .map(res => <type>res.json())
            .catch(this.catch);
    }

    put<type>(url: string, data: any): Observable<type> {
        const options = new RequestOptions({headers: new Headers({'Content-Type': 'application/vnd.api+json'})});
        options.headers.set('Authorization', `Bearer ${this.user.token}`);
        return this.http.put(url, JSON.stringify(data), options)
            .map(res => <type>res.json())
            .catch(this.catch);
    }

    // routes
    searchSeries(query, page) {
        return this.get<Page<Series>>(`api/series/search/${query}/${page}`);
    }

    getAchievements() {
        return this.http.get(`api/series/achievement`);
    }

    getUser(id: string) {
        return this.get<UserData>(`api/user/${id}`);
    }

    searchUsers(query/*, page*/) {
        return this.get<User[]>(`api/user/search/${query}`);
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

    getFollowedUsers(user: string) {
        return this.get<Follower[]>(`api/user/${user}/followers`);
    }

    getFollowsUsers(user: string) {
        return this.get<Follower[]>(`api/user/${user}/follows`);
    }

    getFollower(user: string, follower: string) {
        return this.get<Date>(`api/user/${follower}/follows/${user}`);
    }

    updateFollowing(user: string, follower: string, follows: boolean) {
        return this.put(`api/user/${follower}/follows/${user}`, {follows});
    }

    updateFollowedSeries(series: number, data: {following: boolean, rating?: number, user?: string}) {
        return this.put(`api/followed/${series}`, data);
    }

    getLists() {
        return this.get(`api/list`);
    }

    getPopularSeries(page: number) {
        return this.get<Page<Series>>(`api/series/popular/${page}`);
    }

    getRecommendedSeries(page: number) {
        return this.get<Page<Series>>(`api/series/recommended`);
    }

    getAiringToday(page: number) {
        return this.get<Page<Series>>(`api/series/today/${page}`);
    }

    getFeed(page: number) {
        return this.get<WFEventsPage>(`api/feed/${page}`);
    }

    addEvent(data: {following?: boolean, watched?: boolean, friend?: {id: string, givenName: string, familyName: string}, seriesId?: number, seriesName?: string, seasonId?: number, episodeId?: number, rating?: number}) {
        return this.put(`api/event`, data);
    }

    updateUserData(data){
        return this.put('api/user', data);
    }
}
