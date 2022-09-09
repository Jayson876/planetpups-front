import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss'],
})
export class RegistrationFormComponent implements OnInit {
  errMsg!: string;
  isSubmitted!: boolean;
  registrationForm!: FormGroup;

  @Output() getData: EventEmitter<any> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private storageService: StorageService,
    private authService: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group(
      {
        firstName: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),
        surname: new FormControl('', Validators.compose([Validators.required])),
        email: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+'),
          ])
        ),
        password: new FormControl(
          '',
          Validators.compose([Validators.required, Validators.minLength(8)])
        ),
        confirmPassword: new FormControl(
          '',
          Validators.compose([Validators.required])
        ),

        cell: new FormControl(
          '',
          Validators.compose([
            Validators.required,
            Validators.pattern(
              '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
            ),
          ])
        ),
        whatsapp: new FormControl('', Validators.compose([])),
      },
      {
        validator: this.MustMatch('password', 'confirmPassword'),
      }
    );
  }

  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors?.['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  registerUser() {
    if (this.registrationForm.valid) {
      this.authService.register(this.registrationForm.value).subscribe({
        next: () => {
          console.log('Successfully registered');
        },
        error: () => {
          console.log('Error registering user');
        },
        complete: () => {
          this.reloadPage();
        },
      });
    } else {
      this.isSubmitted = true;
    }
  }
  reloadPage(): void {
    window.location.reload();
  }

  sendData() {
    let data: boolean = true;
    this.getData.emit(data);
  }
}
