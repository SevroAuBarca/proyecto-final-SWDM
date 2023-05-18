import { Component, OnInit } from '@angular/core';
import { JobsService } from 'src/app/services/jobs.service';

@Component({
  selector: 'app-jobs',
  templateUrl: './jobs.component.html',
  styleUrls: ['./jobs.component.css'],
})
export class JobsComponent implements OnInit {
  public jobs: any[] = [];

  constructor(private _jobs: JobsService) {}

  ngOnInit(): void {
    this.getJobs();
  }

  getJobs() {
    this._jobs.getJobs().subscribe((data) => {
      this.jobs = data.body;
      console.log(this.jobs);
    });
  }
}
