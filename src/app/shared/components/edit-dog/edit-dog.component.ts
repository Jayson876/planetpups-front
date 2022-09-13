import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DogService } from 'src/app/services/dog.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-edit-dog',
  templateUrl: './edit-dog.component.html',
  styleUrls: ['./edit-dog.component.scss'],
})
export class EditDogComponent implements OnInit {
  isSubmitted!: boolean;
  updateDogForm!: FormGroup;
  isMixed: boolean = false;
  currentDog!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDogComponent>,
    private fb: FormBuilder,
    private dogService: DogService
  ) {}

  ngOnInit() {
    this.getDogById();

    this.updateDogForm = this.fb.group({
      age: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(0)])
      ),
      shots: new FormControl(
        '',
        Validators.compose([Validators.required, Validators.minLength(0)])
      ),
      gender: new FormControl('', Validators.compose([Validators.required])),
      price: new FormControl('', Validators.compose([Validators.required])),
      breed_1: new FormControl('', Validators.compose([Validators.required])),
      breed_2: new FormControl(''),
    });

    this.getDogById();
  }
  updateDog() {
    if (this.updateDogForm.valid) {
      this.dogService
        .updateDog(this.currentDog._id, this.updateDogForm.value)
        .subscribe(() => {
          this.reloadPage();
        });
    }
  }

  closeDialog() {
    this.dialogRef.close(false);
  }

  formFieldToggle(): void {
    this.isMixed = !this.isMixed;
    if (this.isMixed === false) {
      this.updateDogForm.get('breed_2')?.setValue('');
    }
  }
  getDogById() {
    this.dogService.getDogById(this.data.id).subscribe((result) => {
      this.currentDog = result;
      // console.log(this.currentDog);
      if (this.currentDog.breed_2) {
        this.isMixed = true;
      }
      this.updateDogForm.setValue({
        age: result.age,
        shots: result.shots,
        gender: result.gender,
        price: result.price,
        breed_1: result.breed_1,
        breed_2: result.breed_2,
      });
    });
  }
  reloadPage() {
    window.location.reload();
  }
}
