import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-new-user-dialog',
  templateUrl: './new-user-dialog.component.html',
  styleUrls: ['./new-user-dialog.component.scss'],
})
export class NewUserDialogComponent implements OnInit {
  errMsg!: string;
  isAdmin: boolean = false;
  isSubmitted!: boolean;
  createUserForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NewUserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.createUserForm = this.fb.group(
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
        role: new FormControl('', Validators.compose([Validators.required])),
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

  createUser() {
    console.log(this.createUserForm.value);
    if (this.createUserForm.valid) {
      this.userService.createUser(this.createUserForm.value).subscribe({
        next: () => {
          console.log('Successfully registered');
        },
        error: (err) => {
          this.errMsg = err.error.message;
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

  closeDialog() {
    this.dialogRef.close(false);
  }

}
