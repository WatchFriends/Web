import { Follower, Series } from './';

export class Name {
  constructor(
    public givenName: string,
    public middleName: string,
    public familyName: string
  ) { }
}

export interface User {
  email: string;
  name: Name;
  id: string;
  picture: string;
}

export class UserData implements User {
  email: string;
  name: Name;
  id: string;
  picture: string;
  followers: Follower[];
  follows: Follower[];
  achievements: any[];
  watchlist: Series[];
}