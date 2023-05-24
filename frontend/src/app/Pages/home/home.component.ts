import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import * as alertify from 'alertifyjs';
import { FormBuilder } from '@angular/forms';
import { JobsService } from 'src/app/services/jobs.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  public form = this.formBuilder.group({
    titulo: '',
    categoria: '',
    habilidades: '',
    salario: 0,
    tiempo: '',
    descripcion: '',
  });

  public company: any = {};
  public title: string = '';
  public localStorageData: any = {};
  @ViewChild('post') postForm!: ElementRef<HTMLInputElement>;

  constructor(
    private _company: CompanyService,
    private _job: JobsService,
    private _localStorage: LocalStorageService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.localStorageData = this._localStorage.getLocalStorage('session');
    console.log(this.localStorageData);
    this.getCompany();
  }

  getCompany() {
    this._company.getCompany(this.localStorageData.id).subscribe((data) => {
      this.company = data.body;
      this.company.trabajos = this.company.trabajos.reverse();
      this.title = this.company['nombre_compañia'];
      console.log(this.company);
    });
  }

  postJob() {
    this._job.postJob(this.form.value).subscribe((data) => {
      if (data.body) {
        this.closeModal('post');
        this.ngOnInit();
      }
    });
  }

  showModal(method: string) {
    this.postForm.nativeElement.classList.add('active');
  }

  closeModal(method: string) {
    this.postForm.nativeElement.classList.remove('active');
  }
}
