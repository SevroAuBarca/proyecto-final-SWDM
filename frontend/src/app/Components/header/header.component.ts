import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public localStorageData: any = {
    contratista: false,
    username: 'XD',
    id: '1',
  };
  constructor(
    private _localStorage: LocalStorageService,
    private router: Router
  ) {}

  ngOnInit() {
    if (!this._localStorage.getLocalStorage('session')) {
      this.router.navigate(['/']);
    } else {
      this.localStorageData = this._localStorage.getLocalStorage('session');
    }
  }

  cerrarSesion() {
    this._localStorage.deleteLocalStorage();

    this.router.navigate(['/']);
  }
}
