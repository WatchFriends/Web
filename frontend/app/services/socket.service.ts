import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserService } from './';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService implements OnInit {

    private socket;

    constructor(private http: Http, private userscv: UserService) {
        this.socket = io.connect('http://localhost:3000');
    }

    ngOnInit() { }

    sendEventSocket() {
        this.socket.emit('event', { userId: this.userscv.id });
    }
}
