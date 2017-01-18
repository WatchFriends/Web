import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import * as io from 'socket.io-client'
import {UserService} from "./user.service";

@Injectable()
export class SocketService implements OnInit {
    socket: any = null;

    constructor(private http: Http, private userscv: UserService) {
        this.socket = io.connect('http://localhost:3000');
    }

    ngOnInit() {
    }

    sendEventSocket(){
        this.socket.emit('event', {userId: this.userscv.id});
    }
}