import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import { Subject } from 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class JobService {

  initialJobs = [];
  jobs = [];
  jobsSubject = new Subject();

  BASE_URL = 'http://localhost:4002/';

  constructor( private http: Http) { }
  getJob() {
    return this.http.get(this.BASE_URL + 'api/jobs')
            .map( res => res.json());
  }

  addJob(jobData) {
    jobData.id = Date.now();
    return this.http.post(this.BASE_URL + 'api/jobs', jobData)
                    .map(res => {
                      console.log(res);
                      this.jobsSubject.next(jobData);
                    });
    // this.jobs = [jobData, ...this.jobs]
    // return this.jobsSubject.next(jobData);
  }

  getJobId(id) {
    return this.http.get(this.BASE_URL + `api/jobs/${id}`)
                    .map(res => res.json());
  }
}
