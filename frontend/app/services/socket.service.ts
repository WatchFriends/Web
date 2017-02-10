import { Injectable, OnInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import * as io from 'socket.io-client';

@Injectable()
export class SocketService implements OnInit {

    private socket;
    public message$: Observable<any>;

    constructor(private http: Http, private userscv: UserService) {
        this.socket = io.connect('http://localhost:3000');
        this.message$ = this.on<any>('message');
    }

    ngOnInit() { }

    sendEventSocket() {
        this.socket.emit('event', { userId: this.userscv.id });
    }

    public on<T>(event: string): Observable<T> {
        return new Observable<T>(observer => {
            this.socket.on(event, observer.next);
            return () => this.socket.close();
        });
    }
}
