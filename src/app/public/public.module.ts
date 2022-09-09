import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './partials/footer/footer.component';
import { Button1Component } from './components/button1/button1.component';
import { Button2Component } from './components/button2/button2.component';
import { HeaderComponent } from './partials/header/header.component';
import { HeaderPrimaryComponent } from './partials/header-primary/header-primary.component';
import { LoginBtnComponent } from './partials/header/components/login-btn/login-btn.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog'
import { MatSelectModule } from '@angular/material/select';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginFormComponent } from './partials/header/components/login-btn/components/login-form/login-form.component';
import { RegistrationFormComponent } from './partials/header/components/login-btn/components/registration-form/registration-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    Button1Component,
    Button2Component,
    HeaderPrimaryComponent,
    LoginBtnComponent,
    LoginFormComponent,
    RegistrationFormComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    SharedModule
  ],
  exports: [
    HeaderComponent,
    HeaderPrimaryComponent,
    FooterComponent,
    Button1Component
  ]
})
export class PublicModule {

 }
