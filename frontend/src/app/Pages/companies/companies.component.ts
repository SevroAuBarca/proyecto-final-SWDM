import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css'],
})
export class CompaniesComponent implements OnInit {
  public companies: any = [];

  constructor(private _company: CompanyService) {}

  ngOnInit() {
    this.getCompanies();
  }

  getCompanies() {
    this._company.getCompanies().subscribe((data) => {
      this.companies = data;
    });
  }
}
