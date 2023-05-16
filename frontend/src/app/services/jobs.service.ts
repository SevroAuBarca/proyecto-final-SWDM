import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JobsService {
  public url: string = 'http://localhost:3000/jobs';

  constructor(private _http: HttpClient) {}

  getCompanies() {
    return this._http.get<any>(this.url);
  }

  getCompany(id: string) {
    return this._http.get<any>(`${this.url}/${id}`);
  }

  postCompany(body: any) {
    return this._http.post<any>(this.url, body);
  }

  putCompany(id: string, body: any) {
    return this._http.put<any>(`${this.url}/${id}`, body);
  }

  deleteCompany(id: string) {
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}
