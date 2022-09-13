import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from 'interfaces/dog';
import { User } from 'interfaces/user';
import { DialogService } from 'src/app/services/dialog.service';
import { DogService } from 'src/app/services/dog.service';
import { EditDogService } from 'src/app/services/edit-dog.service';
import { NewDogService } from 'src/app/services/new-dog.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-dog-table',
  templateUrl: './dog-table.component.html',
  styleUrls: ['./dog-table.component.scss'],
})
export class DogTableComponent implements OnInit {
  currentPage = 0;
  pageLimit = 4;
  dogs: Dog[] = [];
  currentUser: any;
  constructor(
private newDogService: NewDogService,
    private dogService: DogService,
    private dialogService: DialogService,
    private editDogService: EditDogService,
  ) {}

  ngOnInit(): void {
    this.getAllDogs();
  }

  getAllDogs() {
    this.dogService.getAllDogs().subscribe((data: any) => {
      this.dogs = data;
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
  changePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageLimit = event.pageSize;
  }

  onPostCreate() {
    this.newDogService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((data: any) => {});
  }

  onUpdate(id: string) {
    this.editDogService
      .openConfirmDialog(id)
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
        }
      });
  }

}

function reloadPage() {
  window.location.reload();
}
