import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}

  user = this.storageService.getUser();
  canActivate(): Promise<boolean> {
    // console.log(this.user);
    return new Promise((resolve) => {
      if (this.storageService.isLoggedIn() && this.user.role === 'Admin') {
        resolve(true);
      } else {
        resolve(false);
        this.router.navigate(['/']);
      }
    });
  }
}
