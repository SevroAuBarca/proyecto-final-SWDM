import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  public url: string = 'http://localhost:3000/login';

  constructor(private _http: HttpClient) {}

  login(body: any) {
    return this._http.post<any>(this.url, body);
  }
}
