import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public companies: any = [];
  public localStorageData: any = {};
  constructor(
    private _company: CompanyService,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    // this.localStorageData = this._localStorage.getLocalStorage('session');
  }

  getCompany() {
    this._company.getCompany('1').subscribe((data) => {});
  }
}
