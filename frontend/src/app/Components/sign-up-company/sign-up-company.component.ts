import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { CompanyService } from 'src/app/services/company.service';
import * as alertify from 'alertifyjs';
@Component({
  selector: 'app-sign-up-company',
  templateUrl: './sign-up-company.component.html',
  styleUrls: ['./sign-up-company.component.css'],
})
export class SignUpCompanyComponent {
  public signUpForm = this.formBuilder.group({
    nombre_compañia: '',
    pais: '',
    informacion: '',
    contraseña: '',
    confirmarContraseña: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private _company: CompanyService
  ) {}

  onSubmit(): void {
    const {
      nombre_compañia,
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
      this._company
        .postCompany({ nombre_compañia, pais, informacion, contraseña })
        .subscribe((data: any) => {
          if (data) {
            window.location.reload();
          }
        });
    }
  }
}
