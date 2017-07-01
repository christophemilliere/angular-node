import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class JobService {
  constructor( private http: Http) { }
  getJob() {
    return this.http.get('data/jobs.json')
              .map( res => res.json());
  }
}
