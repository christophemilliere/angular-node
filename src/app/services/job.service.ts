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

  constructor( private http: Http) { }
  getJob() {
    if(this.jobs.length > 0 && this.initialJobs.length > 0) {
      console.log('case if')
      return Observable.of([...this.jobs, ...this.initialJobs]);
    }else if( this.jobs.length > 0 && this.initialJobs.length === 0) {
      console.log('cas else id')
      return this.http.get('data/jobs.json')
              .map( res => res.json())
              .do(data => {
                this.initialJobs = data
                this.jobs = [...this.jobs, ...this.initialJobs]
              });

    }else{
      console.log('case else')
      return this.http.get('data/jobs.json')
              .map( res => res.json())
              .do(data => this.initialJobs = data);
    }

  }

  addJob(jobData) {
    jobData.id = Date.now();
    this.jobs = [jobData, ...this.jobs]
    return this.jobsSubject.next(jobData);

  }
}
