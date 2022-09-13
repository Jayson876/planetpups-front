import { EditDogComponent } from './../shared/components/edit-dog/edit-dog.component';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Injectable({
  providedIn: 'root'
})
export class EditDogService {
  constructor(private dialog: MatDialog) {}
  openConfirmDialog(id: string) {
    return this.dialog.open(EditDogComponent, {
      width: 'auto',
      panelClass: 'confirm-dialog-container',
      disableClose: true,
      data: {
        id: id,
      },
    });
  }
}
