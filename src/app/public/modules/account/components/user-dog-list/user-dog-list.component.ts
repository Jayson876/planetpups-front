import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Dog } from 'interfaces/dog';
import { DialogService } from 'src/app/services/dialog.service';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-dog-list',
  templateUrl: './user-dog-list.component.html',
  styleUrls: ['./user-dog-list.component.scss'],
})
export class UserDogListComponent implements OnInit {
  storage: any;
  dogListing: Dog[] = [];
  IMAGE_PATH: string = 'http://localhost:8080/public/uploads/';
  currentUser: any;
  constructor(
    private dialogService: DialogService,
    private dogService: DogService,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.storage = this.storageService.getUser();
    this.getUser();
    this.getAllUserDogs();
  }
  getAllUserDogs(): void {
    this.dogService
      .getAllUserDogs(this.storage.id)
      .subscribe((data: any) => {
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
      console.log(this.currentUser);
    });
  }
}

function reloadPage() {
  window.location.reload();
}
