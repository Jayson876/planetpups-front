import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EditUserDialogComponent } from '../private/admin/components/edit-user-dialog/edit-user-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog(userID: string) {
console.log(userID)
    return this.dialog.open(EditUserDialogComponent, {
      width: '458px',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        userId: userID,
      },
    });
  }
}
