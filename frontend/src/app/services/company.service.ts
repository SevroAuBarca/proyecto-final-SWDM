import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public url: string = 'http://localhost:3000/companies';

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

  putProfileImage(id: string, data: any) {
    return this._http.put(`${this.url}/uploadProfileImage/${id}`, data);
  }

  putCoverImage(id: string, data: any) {
    return this._http.put(`${this.url}/uploadCoverImage/${id}`, data);
  }

  putFollowing(id: string) {
    return this._http.put(`${this.url}/following/${id}`, {});
  }

  putFollowers(id: string, data: any) {
    return this._http.put(`${this.url}/followers/${id}`, data);
  }

  deleteCompany(id: string) {
    return this._http.delete<any>(`${this.url}/${id}`);
  }
}
