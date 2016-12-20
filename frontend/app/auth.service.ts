import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class AuthService {

  constructor(private _http: Http) { }

  login(email: string, password: string){
    let headers = new Headers({ 'Content-Type': 'application/json' });
    return this._http.post("/api/auth/login", {email, password}, headers)
        .subscribe((res)=> {
          var json = res.json();
          localStorage.setItem("access-token", json.token);
          localStorage.setItem("user", json.user);
        }, console.error);
  }

}