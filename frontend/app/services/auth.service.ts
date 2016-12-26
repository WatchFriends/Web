import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable, Subscription } from "rxjs";

export class ServerError {
  message: string;
  status: number;
}

@Injectable()
export class AuthService {

  constructor(private http: Http) { }

  headers = new Headers({ 'Content-Type': 'application/vnd.api+json' });
  options = new RequestOptions({ headers: this.headers, withCredentials: true });

  post(url: string, data: any, map) {
    return this.http.post(url, JSON.stringify(data), this.options)
      .map(map)
      .catch(res => Observable.throw(<ServerError>res.json()));
  }

  login(data) {
    return this.post("api/auth/login", data, res => {
        var json = res.json();
        localStorage.setItem("access-token", json.token);
        localStorage.setItem("user", json.user);
        return json;
    });
  }

  register(data) {
    return this.post("api/auth/register", data, res => {
        var json = res.json();
        localStorage.setItem("access-token", json.token);
        localStorage.setItem("user", json.user);
        return json;
    });
  }

  achievements() {
    return this.http.get('api/achievement').map(res => res.json()).catch(this.handleError);
  }

  private handleError(error: Response) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    return Observable.throw(error || "Server Error");
  }
}