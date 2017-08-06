import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  decodedToken = null;
  jobs = [];
  userEmail = ''
  isAdmin = false;
  jobsTitle = '';

  constructor( private authService: AuthService, private jobService: JobService) { }
  ngOnInit() {
    if(this.authService.userIsLoggedIn()) {
      const jjbToken = JSON.parse(window.localStorage.getItem('jbb-data'))
      this.decodedToken = this.authService.decodeTokent(jjbToken.token);
      console.log(this.decodedToken);
      if(this.decodedToken && this.decodedToken.role === 'admin'){
        this.isAdmin = true;
      }
      this.userEmail = this.decodedToken.email;
      // admin must see all jobs
      if(this.isAdmin) {
        this.loadJobsWithoutFilter();
      }else{
        this.loadJobs(this.userEmail)
      }
    }
  }

  loadJobs(userEmail) {
    this.jobService.getJobsByUserEmail(userEmail).subscribe(
      data => this.displayJobs(data.jobs),
      error => console.log(error)
    );
  }
  loadJobsWithoutFilter() {
    this.jobService.getJob().subscribe(
      data => this.displayJobs(data)
    );
  }
  displayJobs(data) {
    this.jobs = data;
    switch(this.jobs.length) {
      case 0:
        this.jobsTitle = 'Aucune annonce postée a ce jour';
        return ;
      case 1:
        this.jobsTitle = '1 annonce postée'
        return;
      default:
        this.jobsTitle = `${this.jobs.length} annonces postées`
    }
  }
}
