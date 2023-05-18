import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  public url: string = 'http://localhost:3000/jobs';
  public token = this._localStorage.getLocalStorage('session');
  headers = new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token.token}`,
  });
  constructor(
    private _http: HttpClient,
    private _localStorage: LocalStorageService
  ) {}

  getJobs() {
    return this._http.get<any>(this.url);
  }

  getJob(id: string) {
    return this._http.get<any>(`${this.url}/${id}`);
  }

  postJob(body: any) {
    return this._http.post<any>(this.url, body, { headers: this.headers });
  }

  putJob(id: string, body: any) {
    return this._http.put<any>(`${this.url}/${id}`, body);
  }

  deleteJob(id: string) {
    return this._http.delete<any>(`${this.url}/${id}`, {
      headers: this.headers,
    });
  }
}
