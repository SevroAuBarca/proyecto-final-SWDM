import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

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
      alert('Contraseñas no coinciden');
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
          if (data) {
            window.location.reload;
          }
        });
    }
  }
}
