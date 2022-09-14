import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
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
  selectedFile!: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<EditDogComponent>,
    private fb: FormBuilder,
    private dogService: DogService
  ) {}

  @ViewChild('dogImage') dogInput!: ElementRef<HTMLInputElement>;

  onFileSelected(event: Event): void {
    const file = this.dogInput.nativeElement?.files?.[0];
    if (file) {
      this.updateDogForm.get('dogImage')?.setValue(file);
    }
    // this.selectedFile = event.target.files[0];
    // this.formData.append('dogImage', file, file.name);
    this.selectedFile = file;
    console.log(this.selectedFile);
    // console.log(event);
  }

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
    const formData = new FormData();
    if (this.updateDogForm.valid) {
      if (this.selectedFile) {
        formData.append('dogImage', this.selectedFile, this.selectedFile.name);
      }
      formData.append('age', this.updateDogForm.controls['age'].value);
      formData.append('shots', this.updateDogForm.controls['shots'].value);
      formData.append('gender', this.updateDogForm.controls['gender'].value);
      formData.append('price', this.updateDogForm.controls['price'].value);
      formData.append('breed_1', this.updateDogForm.controls['breed_1'].value);
      formData.append('breed_2', this.updateDogForm.controls['breed_2'].value);
      this.dogService.updateDog(this.currentDog._id, formData).subscribe(() => {
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
      this.updateDogForm.patchValue({
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
