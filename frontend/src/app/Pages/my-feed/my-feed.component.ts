import { Component, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-feed',
  templateUrl: './my-feed.component.html',
  styleUrls: ['./my-feed.component.css'],
})
export class MyFeedComponent {
  public user: any = {};
  public localStorageData: any = {};
  public coverImage: File | null = null;
  public profileImage: File | null = null;

  @ViewChild('coverImage') cover!: ElementRef<HTMLInputElement>;
  @ViewChild('profileImage') profile!: ElementRef<HTMLInputElement>;

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

  openFormCover() {
    console.log(this.cover);
    this.cover.nativeElement.click();
  }

  openFormProfile() {
    this.profile.nativeElement.click();
  }

  getCoverFile(event: Event) {
    const f = (event.target as HTMLInputElement).files;
    const file: File | null = f?.item(0) as File;

    this.coverImage = file;

    this.submitCoverImage();
  }
  getProfileFile(event: Event) {
    const f = (event.target as HTMLInputElement).files;
    const file: File | null = f?.item(0) as File;

    this.profileImage = file;

    this.submitProfileImage();
  }

  submitCoverImage() {
    const formData = new FormData();
    formData.append('coverImage', this.coverImage!, this.coverImage?.name);
    if (this.localStorageData.contratista) {
      this._company
        .putCoverImage(this.localStorageData.id, formData)
        .subscribe((data) => {
          this.getCompany();
        });
    } else {
      this._user
        .putCoverImage(this.localStorageData.id, formData)
        .subscribe((data) => {
          this.getUser();
        });
    }
  }

  submitProfileImage() {
    const formData = new FormData();
    formData.append('coverImage', this.coverImage!, this.coverImage?.name);
    if (this.localStorageData.contratista) {
      this._company
        .putProfileImage(this.localStorageData.id, formData)
        .subscribe((data) => {
          this.getCompany();
        });
    } else {
      this._user
        .putProfileImage(this.localStorageData.id, formData)
        .subscribe((data) => {
          this.getUser();
        });
    }
  }
}
