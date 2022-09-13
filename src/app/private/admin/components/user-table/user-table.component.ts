import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { User } from 'interfaces/user';
import { DeleteUserService } from 'src/app/services/delete-user.service';
import { EditUserService } from 'src/app/services/edit-user.service';
import { NewUserService } from 'src/app/services/new-user.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss'],
})
export class UserTableComponent implements OnInit {
  currentPage = 0;
  pageLimit = 4;
  users: any[] = [];
  constructor(
    private userService: UserService,
    private deleteUserSerivce: DeleteUserService,
    private newUserService: NewUserService,
    private editUserService: EditUserService
  ) {}

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers().subscribe((results) => {
      this.users = results;
    });
  }

  onDelete(id: string) {
    this.deleteUserSerivce
      .openConfirmDialog('Are you sure you want to delete this user?')
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          this.userService.deleteUserById(id).subscribe({
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

  onUpdate(id: string) {
console.log(id)
    this.editUserService
      .openConfirmDialog(id)
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          console.log(data);
        }
      });
  }

  onUserCreate() {
    this.newUserService
      .openConfirmDialog()
      .afterClosed()
      .subscribe((data: any) => {});
  }

  changePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageLimit = event.pageSize;
  }
}

function reloadPage() {
  window.location.reload();
}
