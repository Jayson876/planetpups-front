import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  currentUser!: any;
  loggedInUser!: any;
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.loggedInUser = this.storageService.getUser();
    this.getUser();
  }

  userLogOut() {
    console.log('User logged out');
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

  getUser() {
    this.userService
      .getUserById(this.loggedInUser.id)
      .subscribe((data: any) => {
        if (!data) return;
        this.currentUser = data;
      });
  }
}
