import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { ApiService, UserService, SocketService } from '../services';
import { UserData, Series, Follower } from '../models';

enum Menus {
    Watchlist = 0,
    Achievements = 1
}
@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {

    public user: UserData;
    public series = new Array<Series>();
    public isFollowing: boolean; // is logged-in user following this user?
    public myProfile = false; // is this the profile of logged-in user?

    public backgroundProfile =
    'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';

    constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private api: ApiService, private userService: UserService,
        private socket: SocketService) {
        route.params.subscribe((params: Params) => {
            let id = params['id'];
            if (!id) {
                 id = userService.id;
                 this.myProfile = true;
            }
            this.loadData(id);
        });
    }

    ngOnInit() { }

    loadData(id: string) {
        this.api.getUser(id).subscribe(user => this.user = user, console.warn);
        if (!this.myProfile) {
            this.userService.authenticated$.subscribe(
                authenticated => {
                    if (authenticated) {
                        this.api.getFollower(id, this.userService.id).subscribe(value => this.isFollowing = value !== null);
                    }
                }
            );
        }
    }

    updateFollowing(following: boolean) {
        this.api.addEvent({
            friend: {
                id: this.user.id,
                familyName: this.user.name.familyName,
                givenName: this.user.name.givenName
            }, following
        }).subscribe();
        this.socket.sendEventSocket();
        this.api.updateFollowing(this.user.id, this.userService.id, following).subscribe(value => this.isFollowing = following);
    }

    transformHtml(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    transformDescription(text: string, next: Number) {
        return text.replace(/%d/, next.toString());
    }
}
