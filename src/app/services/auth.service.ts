import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import * as JwtDecode from 'jwt-decode';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:4002/auth/'
  constructor(private http: Http) { }
  login(crendtials) {
    return this.http.post( this.BASE_URL + 'login', crendtials)
                    .map(res => res.json());
  }

  userIsLoggedIn() {
    return !!window.localStorage.getItem('jbb-data');
  }

  logOut() {
    window.localStorage.removeItem('jbb-data');
  }

  register(crendtials) {
    return this.http.post(`${this.BASE_URL}register`, crendtials)
              .map(res => res.json());
  }

  addAuthorizationHeader(token) {
    // Authorization : bearer token
    const authirazationHeader = new Headers({
      'authorization': 'bearer ' + token
    });

    return new RequestOptions({headers: authirazationHeader});
  }
  decodeTokent(token) {
    return JwtDecode(token);
  }
}
