import {Injectable, OnInit} from '@angular/core';
import {Http, Response} from '@angular/http';
import * as io from 'socket.io-client'

@Injectable()
export class SocketService implements OnInit {
    socket: any = null;

    constructor(private http: Http) {
        this.socket = io.connect('http://localhost:3000');
    }

    ngOnInit() {
    }

    sendEventSocket(userId){
        this.socket.emit('event', {userId: userId});
    }
}