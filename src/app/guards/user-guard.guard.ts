import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  CanDeactivate,
  CanLoad,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class UserGuardGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}


  user = this.storageService.getUser();
  canActivate(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.storageService.isLoggedIn() && this.user.role != 'Admin') {
        resolve(true);
      } else {
        resolve(false);
        this.router.navigate(['/']);
      }
    });
  }
}
