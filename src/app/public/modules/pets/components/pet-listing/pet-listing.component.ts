import { Component, OnInit } from '@angular/core';
import { Dog } from 'interfaces/dog';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.scss'],
})
export class PetListingComponent implements OnInit {
  dogListing: Dog[] = [];
  IMAGE_PATH: string = 'http://localhost:8080/public/uploads/';
  currentUser: any;
  searchText: any;
  constructor(
    private dogService: DogService,
    private storageService: StorageService,
    private dialogService: DialogService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getAllDogs();
    this.currentUser = this.storageService.getUser();
  }

  getAllDogs() {
    this.dogService.getAllDogs().subscribe((data: any) => {
      this.dogListing = data;
    });
  }

  onDelete(id: string) {
    this.dialogService
      .openConfirmDialog('Are you sure you want to delete this post?')
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.dogService.deleteDogById(id).subscribe({
            error: (err: HttpErrorResponse) => {
              console.log(err);
            },
            next: () => {},
            complete() {
              reloadPage();
            },
          });
        }
      });
  }
}
function reloadPage() {
  window.location.reload();
}
