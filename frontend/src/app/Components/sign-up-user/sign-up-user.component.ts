import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import * as alertify from 'alertifyjs';

@Component({
  selector: 'app-sign-up-user',
  templateUrl: './sign-up-user.component.html',
  styleUrls: ['./sign-up-user.component.css'],
})
export class SignUpUserComponent {
  public signUpForm = this.formBuilder.group({
    nombre_completo: '',
    nombre_usuario: '',
    pais: '',
    informacion: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  constructor(private formBuilder: FormBuilder, private _user: UserService) {}

  onSubmit(): void {
    const {
      nombre_completo,
      nombre_usuario,
      pais,
      informacion,
      contraseña,
      confirmarContraseña,
    } = this.signUpForm.value;
    console.log(this.signUpForm.value);
    if (contraseña !== confirmarContraseña) {
      alertify.alert(
        'Las Contraseñas no coinciden, favor de verificar',
        function () {
          alertify.message('OK');
        }
      );
    } else {
      this._user
        .postUser({
          nombre_completo,
          nombre_usuario,
          pais,
          informacion,
          contraseña,
        })
        .subscribe((data: any) => {
          console.log(data);
          if (data) {
            window.location.reload();
          }
        });
    }
  }
}
