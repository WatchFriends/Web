import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';
import {ActivatedRoute, Params} from '@angular/router';
import {ApiService, UserService, SocketService} from '../services';
import {UserData, Series, Follower} from '../models';

@Component({
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ProfileComponent implements OnInit {
    user: UserData;
    series = new Array<Series>();
    isFollowing: boolean; // is logged-in user following this user?
    myProfile: boolean; // is this the profile of logged-in user?

    backgroundProfile: string = 'http://wallpaperpawn.us/wp-content/uploads/2016/07/royal-wall-paper-minimalistic-pink-patterns-damask-royal-simple-wallpapers.jpg';
    profilePicture: string = 'https://scontent-frt3-1.xx.fbcdn.net/v/t1.0-9/14051786_1146069705449340_95700626649935794_n.jpg?oh=04be87d50b50a66ce9b42022df8b2fe5&oe=58E04019';
    watchlistDisplay: String = 'block';
    achievementDisplay: String = 'none';
    socket: any = null;

    achievements = [
        {
            image: `<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 300 300' xml:space='preserve'><path class='st0' d='M194.5,101.5c10.3-10.8,16.6-25.4,16.6-41.4C211.1,26.9,184.2,0,151,0C117.9,0,91,26.9,91,60.1 c0,15.8,6.1,30.2,16.1,40.9c-33.7,10.4-58.4,41.8-58.4,78.8v84.8c0,19.4,15.9,35.3,35.3,35.3h129.6c20.7,0,37.7-17,37.7-37.7v-82.5 C251.3,143.4,227.4,112.4,194.5,101.5z'/></svg>`,
            name: 'Follower',
            description: 'Followed %d people',
            collected: 15,
            progress: 18,
            next: 35,
            status: 'bronze'
        }, {
            image: `<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'  viewBox='0 0 300 300' xml:space='preserve'><path class='st0' d='M263.1,218.1l2.6-4.5l13.5,7.8c11.4-20.5,18.1-43.9,18.6-68.9H282v-5.2h15.7c-0.4-25-7-48.5-18.4-69l-13.7,7.9 l-2.6-4.5l13.7-7.9c-12.4-20.7-29.8-38.1-50.5-50.5l-7.9,13.7l-4.5-2.6l7.9-13.7c-20.5-11.4-44-18-69-18.4v15.7h-5.2V2.4 c-25,0.5-48.4,7.1-68.9,18.6l7.8,13.5L82,37.1l-7.8-13.5C53.6,36,36.3,53.4,23.9,74.1l13.4,7.7l-2.6,4.5l-13.4-7.7 C10,99,3.4,122.4,3,147.4h15.3v5.2H3c0.5,24.9,7.1,48.3,18.5,68.7l13.2-7.6l2.6,4.5l-13.2,7.6c12.4,20.6,29.7,37.9,50.3,50.3 l7.6-13.2l4.5,2.6l-7.6,13.2c20.4,11.3,43.8,18,68.7,18.4v-15.3h5.2v15.3c24.9-0.4,48.4-7,68.8-18.3l-7.7-13.3l4.5-2.6l7.7,13.3 c20.7-12.4,38-29.7,50.5-50.3L263.1,218.1z M228.1,55.1l-66.9,92.5c0.4,2.9,0,5.8-1.3,8.5l47.1,71.5c0.9,1.3,0.5,3.1-0.8,4l-8.4,5.6 c-1.3,0.8-3,0.5-3.8-0.8L146,163.7c-3.1-0.3-6.2-1.6-8.6-4c-5.5-5.5-5.5-14.3,0-19.8c3.6-3.6,8.6-4.8,13.2-3.7l65.1-90 c0.9-1.2,2.5-1.5,3.7-0.6l7.9,5.7C228.7,52.1,229,53.9,228.1,55.1z'/></svg>`,
            name: 'Tracker',
            description: 'Tracked %d series',
            collected: 15,
            progress: 17,
            next: 20,
            status: 'silver'
        }, {
            image: `<svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' viewBox='0 0 850 850' xml:space='preserve'><path class='st0' d='M477.6,400.4c-17.9,0-32.3-14.5-32.3-32.3c0-9.9,4.4-18.7,11.4-24.6c-9.8-3.8-20.4-6-31.6-6 c-48.4,0-87.6,39.2-87.6,87.6c0,48.4,39.2,87.6,87.6,87.6s87.6-39.2,87.6-87.6c0-13.7-3.2-26.6-8.8-38.1 C497.9,395.1,488.3,400.4,477.6,400.4z M425,258c-92.3,0-167.1,74.8-167.1,167.1S332.7,592.2,425,592.2s167.1-74.8,167.1-167.1 S517.3,258,425,258z M425.3,588.6c-90.3,0-163.4-73.2-163.4-163.4s73.2-163.4,163.4-163.4s163.4,73.2,163.4,163.4 S515.6,588.6,425.3,588.6z M0,424.2v1.8c241.2,234.8,621.4,234.8,850,0v-1.8C621.4,189.4,241.2,189.4,0,424.2z M839.5,425.8 c-222.8,228.9-593.3,228.9-828.5,0v-1.7c235.1-228.9,605.7-228.9,828.5,0V425.8z'/></svg>`,
            name: 'Watcher',
            description: 'Watched %d hours',
            collected: 50,
            progress: 52,
            next: 50,
            status: 'gold'
        }
    ];

    constructor(private sanitizer: DomSanitizer, private route: ActivatedRoute, private api: ApiService, private userService: UserService, private socketsvc: SocketService) {
        route.params.subscribe((params: Params) => {
            let id = params['id'];
            if (!id) id = userService.id; // user's own profile            
            this.myProfile = id === userService.id;
            this.loadData(id);
        });
    }

    ngOnInit() {
    }

    loadData(id: string) {
        this.api.getUser(id).subscribe(user => this.user = user, console.warn);
        if (!this.myProfile) {
            this.userService.authenticated$.subscribe(
               value => {
                   if(value) this.api.getFollower(id, this.userService.id).subscribe(value => this.isFollowing = value !== null);
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
        this.socketsvc.sendEventSocket();
        this.api.updateFollowing(this.user.id, this.userService.id, following).subscribe(value => this.isFollowing = following);
    }

    transformHtml(html: string) {
        return this.sanitizer.bypassSecurityTrustHtml(html);
    }

    transformDescription(text: string, next: Number): String {
        return text.replace(/%d/, next.toString());
    }

    changeContent(menu: Number) {

        let actievementsMenu = document.querySelector('a[data-hover="My Watchlist"]'),
            watchlistMenu = document.querySelector('a[data-hover="Achievements"]');

        switch (menu) {
            case 0:
                this.watchlistDisplay = 'block';
                this.achievementDisplay = 'none';

                actievementsMenu.classList.add('active');
                watchlistMenu.classList.remove('active');
                break;
            case 1:
                this.watchlistDisplay = 'none';
                this.achievementDisplay = 'block';

                actievementsMenu.classList.remove('active');
                watchlistMenu.classList.add('active');
                break;
            default:
                this.watchlistDisplay = 'block';
                this.achievementDisplay = 'none';

                actievementsMenu.classList.add('active');
                watchlistMenu.classList.remove('active');
                break;
        }
    }
}
