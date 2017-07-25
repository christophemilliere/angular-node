import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:4002/auth/'
  constructor(private http: Http) { }
  login(crendtials) {
    return this.http.post( this.BASE_URL + 'login', crendtials)
                    .map(res => res.json());
  }

  userIsLoggedIn() {
    return window.localStorage.getItem('jbb-data');
  }

  logOut() {
    window.localStorage.removeItem('jbb-data');
  }
}
