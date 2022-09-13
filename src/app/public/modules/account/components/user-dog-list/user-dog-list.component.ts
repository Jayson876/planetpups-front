import { environment } from 'src/environments/environment';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from 'interfaces/dog';
import { DialogService } from 'src/app/services/dialog.service';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';
import { EditDogService } from 'src/app/services/edit-dog.service';

@Component({
  selector: 'app-user-dog-list',
  templateUrl: './user-dog-list.component.html',
  styleUrls: ['./user-dog-list.component.scss'],
})
export class UserDogListComponent implements OnInit {
  isAdmin: boolean = false;
  currentPage = 0;
  pageLimit = 20;
  storage: any;
  dogListing: Dog[] = [];
  IMAGE_PATH: string = environment.IMAGE_PATH;
  currentUser: any;
  constructor(
    private dialogService: DialogService,
    private dogService: DogService,
    private storageService: StorageService,
    private userService: UserService,
    private editDogService: EditDogService
  ) {}

  ngOnInit(): void {
    this.storage = this.storageService.getUser();
    this.getUser();
    this.getAllUserDogs();
    this.currentUser = this.storageService.getUser();
    if (this.currentUser.role === 'Admin') {
      this.isAdmin = true;
    } else {
      this.isAdmin = false;
    }
  }
  getAllUserDogs(): void {
    this.dogService.getAllUserDogs(this.storage.id).subscribe((data: any) => {
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

  getUser() {
    this.userService.getUserById(this.storage.id).subscribe((data: any) => {
      if (!data) return;
      this.currentUser = data;
    });
  }

  onUpdate(id: string) {
    this.editDogService
      .openConfirmDialog(id)
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          // console.log(data);
        }
      });
  }

  changePage(event: any) {
    // console.log(event);
    this.currentPage = event.pageIndex;
    this.pageLimit = event.pageSize;
  }
}

function reloadPage() {
  window.location.reload();
}
