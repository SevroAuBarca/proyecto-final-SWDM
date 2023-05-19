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
  public getId: string = '';
  public form = this.formBuilder.group({
    titulo: '',
    categoria: '',
    habilidades: '',
    salario: 0,
    tiempo: '',
    descripcion: '',
  });
  public formUpdate = this.formBuilder.group({
    titulo: '',
    categoria: '',
    habilidades: '',
    salario: 0,
    tiempo: '',
    descripcion: '',
  });
  public company: any = {};
  public localStorageData: any = {};
  @ViewChild('post') postForm!: ElementRef<HTMLInputElement>;
  @ViewChild('put') putForm!: ElementRef<HTMLInputElement>;
  @ViewChild('options') options!: ElementRef<HTMLInputElement>;

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
      console.log(this.company);
    });
  }

  getJob() {
    this._job.getJob(this.getId).subscribe((data) => {
      console.log(data.body);
      this.formUpdate.patchValue({
        titulo: data.body.titulo,
        categoria: data.body.categoria,
        habilidades: data.body.habilidades,
        salario: data.body.salario,
        tiempo: data.body.tiempo,
        descripcion: data.body.descripcion,
      });
    });
  }

  postJob() {
    this._job.postJob(this.form.value).subscribe((data) => {
      if (data.body) {
        this.getCompany();
        this.closeModal('post');
      }
    });
  }

  putJob(id: string) {
    this._job.putJob(id, this.formUpdate.value).subscribe((data) => {
      if (data.body) {
        this.getCompany();
        this.closeModal('put');
      }
    });
  }

  deleteJob(id: string) {
    console.log(id);
    this._job.deleteJob(id).subscribe((data) => {
      console.log(data);
      window.location.reload();
    });
  }

  getIdJob(id: string) {
    this.getId = id;
    this.getJob();
  }

  toggleOptions() {
    if (this.options.nativeElement.classList.contains('active')) {
      this.options.nativeElement.classList.remove('active');
    } else {
      this.options.nativeElement.classList.add('active');
    }
  }

  showModal(method: string) {
    method === 'post'
      ? this.postForm.nativeElement.classList.add('active')
      : this.putForm.nativeElement.classList.add('active');
  }

  closeModal(method: string) {
    console.log('xd');
    method === 'post'
      ? this.postForm.nativeElement.classList.remove('active')
      : this.putForm.nativeElement.classList.remove('active');
  }
}
