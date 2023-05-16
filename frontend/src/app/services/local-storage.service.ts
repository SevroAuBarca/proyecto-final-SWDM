import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  setLocalStorage(key: string, data: any) {
    return localStorage.setItem(key, JSON.stringify(data));
  }

  getLocalStorage(key: string) {
    return JSON.parse(localStorage.getItem(key)!);
  }

  deleteLocalStorage() {
    return localStorage.clear();
  }
}
