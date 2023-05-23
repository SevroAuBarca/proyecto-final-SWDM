import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RoutesRecognized,
} from '@angular/router';
import { filter, pairwise } from 'rxjs';
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
  public previousUrl: string = '';
  public url: string = '';
  constructor(
    private _company: CompanyService,
    private _user: UserService,
    private _localStorage: LocalStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.localStorageData = this._localStorage.getLocalStorage('session');
    // this.router.events
    //   .pipe(
    //     filter((e: any) => e instanceof RoutesRecognized),
    //     pairwise()
    //   )
    //   .subscribe((e: any) => {
    //     if (e[0].urlAfterRedirects === '/Companies') this.getCompany(id!);
    //     // else this.getUser(id!);
    //     console.log(e[0].urlAfterRedirects);
    //   });
    this.getCompany(id!);
  }

  getCompany(id: string) {
    console.log(id);

    this._company.getCompany(id).subscribe((data) => {
      console.log(data);

      this.user = data.body;
      console.log(this.user);
    });
  }

  // getUser(id: string) {
  //   console.log(id);

  //   this._user.getUser(id).subscribe((data) => {
  //     console.log(data);
  //     this.user = data.body;
  //   });
  // }
}
