import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public user: any = {};
  public localStorageData: any = {};
  constructor(
    private _company: CompanyService,
    private _user: UserService,
    private _localStorage: LocalStorageService
  ) {}

  ngOnInit() {
    this.localStorageData = this._localStorage.getLocalStorage('session');
    console.log(this.localStorageData);
    if (this.localStorageData.contratista) {
      this.getCompany();
    } else {
      this.getUser();
    }
  }

  getCompany() {
    this._company.getCompany(this.localStorageData.id).subscribe((data) => {
      this.user = data.body;
      console.log(this.user);
    });
  }

  getUser() {
    this._user.getUser(this.localStorageData.id).subscribe((data) => {
      this.user = data.body;
    });
  }
}
