export class Name {
  givenName: string;
  middleName: string;
  familyName: string;
}

export interface User {
  email: string;
  name: Name;
  id: string;
}