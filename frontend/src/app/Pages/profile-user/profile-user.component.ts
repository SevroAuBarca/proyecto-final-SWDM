import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css'],
})
export class ProfileUserComponent {
  public user: any = {};
  public localStorageData: any = {};

  constructor(
    private _user: UserService,
    private _localStorage: LocalStorageService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.localStorageData = this._localStorage.getLocalStorage('session');

    this.getUser(id!);
  }

  getUser(id: string) {
    console.log(id);
    this._user.getUser(id).subscribe((data) => {
      console.log(data);
      this.user = data.body;
    });
  }
}
