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
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  @Output() getData: EventEmitter<any> = new EventEmitter();
  showForm: boolean = false;
  isSubmitted = false;
  pageHeight!: number;
  errMsg!: string;
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: new FormControl('', Validators.compose([Validators.required])),
      password: new FormControl('', Validators.compose([Validators.required])),
    });

    this.pageHeight = +document.body.clientHeight - 1;
  }

  loginUser(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        error: (err: HttpErrorResponse) => {
          this.errMsg = err.error.message;
        },
        next: (data) => {
          this.storageService.saveUser(data);
          this.reloadPage();
        },
      });
    } else {
      this.isSubmitted = true;
    }
  }

  sendData() {
    let data: boolean = false;
    this.getData.emit(data);
  }
  reloadPage(): void {
    window.location.reload();
  }
}
