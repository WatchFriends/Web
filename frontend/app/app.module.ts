// packages
import {BrowserModule} from '@angular/platform-browser';
import {NgModule, LOCALE_ID} from '@angular/core';
import {FormsModule, FormBuilder, NgControl} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {DropdownModule, CollapseModule, TooltipModule} from 'ng2-bootstrap';
// services
import {ApiService, AuthGuard, UnAuthGuard, UserService, SocketService} from './services';
import {SeriesImagePipe, UserImagePipe} from './pipes';
// components
import {AppComponent} from './app.component';
import {NavComponent} from './nav/nav.component';
import {SearchComponent} from './search/search.component';
import {HomeComponent} from './home/home.component';
import {ExploreComponent} from './explore/explore.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {SeriesDetailComponent} from './seriesdetail/seriesdetail.component';
import {SeasonDetailComponent} from './seasondetail/seasondetail.component';
import {ErrorComponent} from './error/error.component';
import {FeedComponent} from './feed/feed.component';
import {SettingsComponent} from './settings/settings.component';

//selectors
import {Wfseries} from './components/series/series.component';
import {WfShadow} from './components/shadow/shadow.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        NavComponent,
        LoginComponent,
        RegisterComponent,
        ExploreComponent,
        SearchComponent,
        ProfileComponent,
        SeriesDetailComponent,
        SeasonDetailComponent,
        ErrorComponent,
        FeedComponent,
        SeriesImagePipe,
        UserImagePipe,
        Wfseries,
        SettingsComponent,
        WfShadow
    ],
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        DropdownModule.forRoot(),
        CollapseModule.forRoot(),
        TooltipModule.forRoot(),
        RouterModule.forRoot([
            {path: 'home', component: HomeComponent},
            {path: 'login', component: LoginComponent, canActivate: [UnAuthGuard]},
            {path: 'register', component: RegisterComponent, canActivate: [UnAuthGuard]},
            {path: 'explore', component: ExploreComponent},
            {path: 'search/:query', component: SearchComponent},
            {path: 'error', component: ErrorComponent},
            {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
            {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]}, // userprofile
            {path: 'profile/:id', component: ProfileComponent}, // friend profile
            {path: 'series/:id', component: SeriesDetailComponent},
            {path: 'series/:id/season/:seasonId', component: SeasonDetailComponent},
            {path: 'feed', component: FeedComponent},
            {path: '**', redirectTo: 'home'},
        ])
    ],
    providers: [
        { provide: LOCALE_ID, useValue: navigator.language || 'en-US' }, // voor datetime pipe
        UserService,
        AuthGuard,
        UnAuthGuard,
        ApiService,
        SocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
