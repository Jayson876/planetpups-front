import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditUserService } from 'src/app/services/edit-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
})
export class EditUserDialogComponent implements OnInit {
  currentUser!: any;
  errMsg!: string;
  isAdmin: boolean = false;
  isSubmitted!: boolean;
  updateForm!: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditUserDialogComponent>,
    private fb: FormBuilder,
    private userService: UserService,
    private editUserService: EditUserService
  ) {}

  ngOnInit(): void {
    console.log(this.data.userId);
    this.getUserById();
    this.updateForm = this.fb.group({
      firstName: new FormControl('', Validators.compose([Validators.required])),
      surname: new FormControl('', Validators.compose([Validators.required])),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+'),
        ])
      ),
      role: new FormControl('', Validators.compose([Validators.required])),
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
    });
  }

  updateUser() {
    if (this.updateForm.valid) {
      this.updateForm.valid;
      this.updateForm.get('firstName')?.clearValidators();
      this.userService
        .updateUser(this.currentUser._id, this.updateForm.value)
        .subscribe({
          next: () => {
            console.log('User updated');
          },
          error: () => {
            console.log('Error updating user');
          },
          complete: () => {
            this.reloadPage();
          },
        });
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  getUserById() {
    this.userService.getUserById(this.data.userId).subscribe((result) => {
      this.currentUser = result;
      console.log(this.currentUser);
      this.updateForm.setValue({
        firstName: result.firstName,
        surname: result.surname,
        email: result.email,
        role: result.role,
        cell: result.cell,
        whatsapp: result.whatsapp,
      });
    });
  }
}
