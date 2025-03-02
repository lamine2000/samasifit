import { Component, inject } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatStepperModule } from '@angular/material/stepper';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterOutlet
  ]
})
export class AppComponent {
  title = 'samasifit';
  private _formBuilder = inject(FormBuilder);

  personalInfoGroup = this._formBuilder.group({
    firstNameCtrl: ['', Validators.required],
    lastNameCtrl: ['', Validators.required],
    ageCtrl: ['', Validators.required],
  });

  contactInfoGroup = this._formBuilder.group({
    phoneNumberCtrl: ['', Validators.pattern("^\\+?[0-9]+(\\s[0-9]+)*$")],
    addressCtrl: ['', Validators.email],
  });
}
