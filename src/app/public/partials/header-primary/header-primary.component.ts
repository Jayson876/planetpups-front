import { Component, OnInit } from '@angular/core';
import { User } from 'interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header-primary',
  templateUrl: './header-primary.component.html',
  styleUrls: ['./header-primary.component.scss']
})
export class HeaderPrimaryComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser!: User;
  isAdmin: boolean = false;
  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.storageService.isLoggedIn();
    this.currentUser = this.storageService.getUser();
    if(this.currentUser.role === "Admin"){
      this.isAdmin = true
    } else {
      this.isAdmin = false;
    }
  }
}
