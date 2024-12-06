export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  webiste: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}
