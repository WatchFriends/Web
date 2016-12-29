import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  private _name: Name;
  private _email: string;
  private _token: string;
  private _authenticated: boolean;

  constructor() { }

  get name() { return this._name };
  get email() { return this._email };
  get token() { return this._token };
  get authenticated() { return this.authenticated };

  setUser(user) {
    if (user) {
      this._authenticated = true;
      var name = user.name;
      if (!name) console.error("user does not have a name");
      this._name = name;
      var email = user.email;
      if (!email) console.error("user does not have a e-mail");
      this._email = email;
    }
    else this._authenticated = false;
  }

  setToken(token: string) {
    if (!token) console.error("no valid token supplied");
    this._token = token;
  }


}

export class Name {
  givenName: string;
  middleName: string;
  lastName: string;
}