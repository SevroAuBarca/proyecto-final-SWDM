import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent {
  public users: any = [];

  constructor(private _user: UserService) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this._user.getUsers().subscribe((data) => {
      this.users = data.body;
      console.log(data);
    });
  }
}
