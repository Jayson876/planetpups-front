import { NewUserDialogComponent } from '../private/admin/components/new-user-dialog/new-user-dialog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class NewUserService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog() {
    return this.dialog.open(NewUserDialogComponent, {
      width: '458px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        message: ".",
      },
    });
  }
}
