import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CompanyService } from 'src/app/services/company.service';
import { JobsService } from 'src/app/services/jobs.service';
import { FormBuilder } from '@angular/forms';
import * as alertify from 'alertifyjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent {
  public getId: string = '';

  @Input() company: any = {};
  @Output() getCompany = new EventEmitter();

  @ViewChild('put') putForm!: ElementRef<HTMLInputElement>;
  @ViewChild('options') options!: ElementRef<HTMLInputElement>;

  public formUpdate = this.formBuilder.group({
    titulo: '',
    categoria: '',
    habilidades: '',
    salario: 0,
    tiempo: '',
    descripcion: '',
  });
  constructor(private _job: JobsService, private formBuilder: FormBuilder) {}

  getIdJob(id: string) {
    this.getId = id;
    this.getJob();
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

  putJob(id: string) {
    this._job.putJob(id, this.formUpdate.value).subscribe((data) => {
      if (data.body) {
        this.getCompany.emit();
        this.closeModal('put');
        alertify.success('Trabajo Actualizado con exito!');
      }
    });
  }

  deleteJob(id: string) {
    console.log(id);
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Se eliminara este trabajo',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Salir',
      confirmButtonText: 'Eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleOptions();
        this._job.deleteJob(id).subscribe((data: any) => {
          console.log(data);
          this.getCompany.emit();
          alertify.success('Trabajo eliminado con exito!');

          // window.location.reload();
        });
      }
    });
  }

  showModal(method: string) {
    this.putForm.nativeElement.classList.add('active');
  }

  closeModal(method: string) {
    console.log('xd');
    this.putForm.nativeElement.classList.remove('active');
  }

  toggleOptions() {
    if (this.options.nativeElement.classList.contains('active')) {
      this.options.nativeElement.classList.remove('active');
    } else {
      this.options.nativeElement.classList.add('active');
    }
  }
}
