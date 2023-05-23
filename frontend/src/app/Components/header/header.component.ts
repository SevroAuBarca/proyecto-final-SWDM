import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';

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
  @ViewChild('options') options!: ElementRef<HTMLInputElement>;

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
    Swal.fire({
      title: '¿Estas Seguro?',
      text: 'Cerraras la sesion actual',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelas',
      confirmButtonText: 'Cerrar Sesion',
    }).then((result) => {
      if (result.isConfirmed) {
        this.toggleOptions();
        this._localStorage.deleteLocalStorage();

        this.router.navigate(['/']);
      }
    });
  }

  toggleOptions() {
    if (this.options.nativeElement.classList.contains('active')) {
      this.options.nativeElement.classList.remove('active');
    } else {
      this.options.nativeElement.classList.add('active');
    }
  }
}
