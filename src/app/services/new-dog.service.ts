import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NewDogComponent } from '../private/admin/components/new-dog/new-dog.component';
@Injectable({
  providedIn: 'root'
})
export class NewDogService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog() {
    return this.dialog.open(NewDogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
      },
    });
  }
}
