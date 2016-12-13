import { Component } from '@angular/core';

@Component ({
    selector: "wf-app",
    templateUrl: 
`<div><h1>{{pageTitle}}</h1>
<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, nihil. Asperiores voluptate ipsa sunt dolores, et fuga, nam deleniti rerum animi aspernatur quo quibusdam neque aut! Esse dignissimos eligendi quos.</p>
</div>` 
})

export class AppComponent {
    pageTitle: string = 'WatchFriends'

}