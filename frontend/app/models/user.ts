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
