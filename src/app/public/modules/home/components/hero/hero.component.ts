import { LogingToggleService } from './../../../../../services/loging-toggle.service';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss'],
})
export class HeroComponent implements OnInit, AfterViewInit {
currentUser: any;
  constructor(
    private logingToggleSerice: LogingToggleService,
    private storageService: StorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
  this.currentUser = this.storageService.getUser();
  }

  loginFormToggle() {
    if (this.storageService.isLoggedIn() && this.currentUser.role != 'Admin') {
      this.router.navigate(['/account'])
    } else if (this.storageService.isLoggedIn() && this.currentUser.role === 'Admin') {
      this.router.navigate(['/admin'])
    }
    else {
      this.logingToggleSerice.setValue();
    }
  }
  ngAfterViewInit(): void {}
}
