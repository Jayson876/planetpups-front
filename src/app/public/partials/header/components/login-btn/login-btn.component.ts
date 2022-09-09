import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-login-btn',
  templateUrl: './login-btn.component.html',
  styleUrls: ['./login-btn.component.scss'],
})
export class LoginBtnComponent implements OnInit {
  isLoggedIn: boolean = false;
  showForm: boolean = false;
  showInnerForm: boolean = true;
  pageHeight!: number;

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.pageHeight = +document.body.clientHeight - 1;
    this.isLoggedIn = this.storageService.isLoggedIn();
  }

  formToggle(): void {
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  getData(data: any) {
    console.log(data);
    this.showInnerForm = data;
  }

  userLogOut() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean()
        this.reloadPage();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
