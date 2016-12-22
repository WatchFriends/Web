import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
  options = new RequestOptions({ headers: this.headers, withCredentials: true });

  login(data) {
    var body = `email=${data.email}&password=${data.password}`;
    //var body = JSON.stringify(data);
    /*var body = new FormData();
    body.append("email", data.email);
    body.append("password", data.password);*/

    return this.http.post("api/auth/login", body, this.options)
      .do(console.dir)
      .map((res) => {
        console.dir(res);
        var json = res.json();
        localStorage.setItem("access-token", json.token);
        localStorage.setItem("user", json.user);
        return json;
      })
      .catch((res, caught) => Observable.of(res.json()));
  }

  achievements(){
    return this.http.get('api/achievement').map(res => res.json()).catch(this.handleError);
  }

  private handleError (error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}