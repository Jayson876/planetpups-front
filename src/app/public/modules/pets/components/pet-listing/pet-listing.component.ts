import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Dog, Gender } from 'interfaces/dog';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { DialogService } from 'src/app/services/dialog.service';
import { HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { EditDogService } from 'src/app/services/edit-dog.service';
@Component({
  selector: 'app-pet-listing',
  templateUrl: './pet-listing.component.html',
  styleUrls: ['./pet-listing.component.scss'],
})
export class PetListingComponent implements OnInit {
  currentPage = 0;
  pageLimit = 20;
  dogListing: Dog[] = [];
  IMAGE_PATH: string = environment.IMAGE_PATH;
  currentUser: any;
  searchText: any;
  st!: string;
  allDogs: Dog[] = [];
  searchFilter!: FormGroup;
  filterQueries!: FormGroup;
  searchList: Dog[] = [];
  filteredList: Dog[] = [];
  errMsg!: string;
  constructor(
    private dogService: DogService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private dialogService: DialogService,
    private editDogService: EditDogService,
    private dialog: MatDialog
  ) {
    this.getAllDogs();
  }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
    this.searchFilter = this.fb.group({
      search: new FormControl(''),
    });
    this.filterQueries = this.fb.group({
      gender: new FormControl(''),
      breed: new FormControl(''),
      price: new FormControl(''),
    });
  }

  getAllDogs() {
    this.dogService.getAllDogs().subscribe((data: any) => {
      this.dogListing = data;
    });
  }

  filteredDogs() {
    this.dogService.filteredDogs(this.filterQueries.value).subscribe((data) => {
      if (!data) {
        this.dogListing = this.allDogs;
      } else {
        this.dogListing = [];
        this.dogListing = data;
      }
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

  onUpdate(id: string) {
    this.editDogService
      .openConfirmDialog(id)
      .afterClosed()
      .subscribe((data: any) => {
        if (data) {
          
        }
      });
  }

  searchBreed(): void {
    let text = this.searchFilter.controls?.['search'].value;
    this.st = text;
    if (text != '') {
      this.dogService.getAllSearchedDogs(text).subscribe((data: any) => {
        this.searchList = data;
        if (this.searchList.length <= 0) {
          this.errMsg = 'No results found';
        } else {
          this.errMsg = '';
        }
      });
    } else {
      this.searchList = [];
      this.errMsg = '';
    }
  }
  changePage(event: any) {
    this.currentPage = event.pageIndex;
    this.pageLimit = event.pageSize;
  }
}

function reloadPage() {
  window.location.reload();
}
