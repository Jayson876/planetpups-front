import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LogingToggleService } from 'src/app/services/loging-toggle.service';
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
    private storageService: StorageService,
    private logingService: LogingToggleService
  ) {}

  ngOnInit(): void {
    this.pageHeight = +document.body.clientHeight - 1;
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.logingService.getValue().subscribe((value: boolean) => {
      this.showForm = value;
      // console.log('SHOW:', this.showForm);
    });
  }

  formToggle(): void {
    if (this.showForm) {
      this.showForm = false;
    } else {
      this.showForm = true;
    }
  }

  getData(data: any) {
    this.showInnerForm = data;
  }

  userLogOut() {
    this.authService.logout().subscribe({
      next: (res) => {
        this.storageService.clean();
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
