import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/services/local-storage.service';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css'],
})
export class SignInComponent {
  public signInForm = this.formBuilder.group({
    usuario: '',
    contraseña: '',
    mantenerSesion: false,
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private _login: LoginService,
    private _localStorage: LocalStorageService
  ) {}

  onSubmit(): void {
    const { usuario, contraseña, mantenerSesion } = this.signInForm.value;

    this._login.login({ usuario, contraseña }).subscribe((data: any) => {
      if (data) {
        if (mantenerSesion) {
          this._localStorage.setLocalStorage('mantener', true);
        }
        this._localStorage.setLocalStorage('session', data);

        data.contratista
          ? this.router.navigate(['Home'])
          : this.router.navigate(['Jobs']);
      }
    });
  }
}
