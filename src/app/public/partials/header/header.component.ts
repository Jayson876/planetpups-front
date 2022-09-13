import { Component, OnInit } from '@angular/core';
import { User } from 'interfaces/user';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean = false;
  currentUser!: any;
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
