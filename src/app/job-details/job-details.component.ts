import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from '../services/job.service';

@Component({
  selector: 'cc-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.css']
})
export class JobDetailsComponent implements OnInit {
  jobDetails = null;
  error = null;
  errorMessage = '';
  constructor(private jobService: JobService, private activedRoute: ActivatedRoute) { }

  ngOnInit() {
    const id = this.activedRoute.snapshot.params.id
    console.log("id", id);
    this.jobService.getJobId(id).subscribe(
      data => {
        this.handleServerResponse(data)
      },
      error => {
        this.handleError(error);
      }
    )
  }

  handleServerResponse(response) {
    if( response.success ) {
      this.jobDetails = response.job;
    } else {
      this.errorMessage = response.message
    }
  }

  handleError(error) {
    console.log('Handle error', error);
    this.error = error;
  }

}
