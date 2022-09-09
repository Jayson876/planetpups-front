import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  storage: any;
  currentUser: any;
  isDisabled: boolean = true;
  updateForm!: FormGroup;
  constructor(
    private userService: UserService,
    private storageService: StorageService,
    private http: HttpClient,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}
  selectedFile = null;

  ngOnInit(): void {
    this.storage = this.storageService.getUser();
    this.getUser();
    this.updateForm = this.fb.group({
      firstName: new FormControl(
        { value: '', disabled: this.isDisabled },
        Validators.compose([Validators.required])
      ),
      surname: new FormControl(
        { value: '', disabled: this.isDisabled },
        Validators.compose([Validators.required])
      ),
      email: new FormControl(
        { value: '', disabled: this.isDisabled },
        Validators.compose([
          Validators.required,
          Validators.pattern('[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+'),
        ])
      ),
      cell: new FormControl(
        { value: '', disabled: this.isDisabled },
        Validators.compose([
          Validators.required,
          Validators.pattern(
            '^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$'
          ),
        ])
      ),
      whatsapp: new FormControl(
        { value: '', disabled: this.isDisabled },
        Validators.compose([])
      ),
    });
  }

  updateProfile(id: string) {
    if (this.updateForm.valid) {
      this.userService.updateUser(id, this.updateForm.value).subscribe({
        next: () => {
          console.log('Profile updated');
        },
        error: () => {
          console.log('Error updating profile');
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

  enableForm() {
    this.isDisabled = !this.isDisabled;
    this.updateForm.controls['firstName'][
      this.isDisabled ? 'disable' : 'enable'
    ]();
    this.updateForm.controls['surname'][
      this.isDisabled ? 'disable' : 'enable'
    ]();
    this.updateForm.controls['email'][this.isDisabled ? 'disable' : 'enable']();
    this.updateForm.controls['cell'][this.isDisabled ? 'disable' : 'enable']();
    this.updateForm.controls['whatsapp'][
      this.isDisabled ? 'disable' : 'enable'
    ]();
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }
  getUser() {
    this.userService.getUserById(this.storage.id).subscribe((data: any) => {
      if (!data) return;
      this.currentUser = data;
      console.log(this.currentUser);
    });
  }
}
