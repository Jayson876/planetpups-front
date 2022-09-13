import { DogService } from './../../../../../services/dog.service';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { StorageService } from 'src/app/services/storage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-create-dog-form',
  templateUrl: './user-create-dog-form.component.html',
  styleUrls: ['./user-create-dog-form.component.scss'],
})
export class UserCreateDogFormComponent implements OnInit {
  isSubmitted!: boolean;
  storage: any;
  newDogForm!: FormGroup;
  isMixed: boolean = false;
  currentUser!: any;
  selectedFile!: any;
  constructor(
    private dogService: DogService,
    private fb: FormBuilder,
    private storageService: StorageService,
    private userService: UserService
  ) {}

  @ViewChild('dogImage') dogInput!: ElementRef<HTMLInputElement>;

  onFileSelected(event: Event): void {
    const file = this.dogInput.nativeElement?.files?.[0];
    if (file) {
      this.newDogForm.get('dogImage')?.setValue(file);
    }
    // this.selectedFile = event.target.files[0];
    // this.formData.append('dogImage', file, file.name);
    this.selectedFile = file;
    // console.log(this.selectedFile);
    // console.log(event);
  }

  ngOnInit(): void {
    this.storage = this.storageService.getUser();
    this.getUser();
    this.currentUser = this.storageService.getUser();
    this.newDogForm = this.fb.group({
      dogImage: new FormControl('', Validators.compose([Validators.required])),
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
  }
  formFieldToggle(): void {
    this.isMixed = !this.isMixed;
    this.newDogForm.controls['breed_2'].setValue('');
    this.newDogForm.controls['breed_2'].markAsUntouched();
    this.newDogForm.controls['breed_2'].markAsPristine();
  }
  createPost() {
    const formData = new FormData();
    if (this.newDogForm.valid) {
      formData.append('dogImage', this.selectedFile, this.selectedFile.name);
      formData.append('age', this.newDogForm.controls['age'].value);
      formData.append('shots', this.newDogForm.controls['shots'].value);
      formData.append('gender', this.newDogForm.controls['gender'].value);
      formData.append('price', this.newDogForm.controls['price'].value);
      formData.append('breed_1', this.newDogForm.controls['breed_1'].value);
      formData.append('breed_2', this.newDogForm.controls['breed_2'].value);
      this.dogService.createDogPost(formData, this.currentUser._id).subscribe({
        next: () => {},
        error: () => {
          console.log('Error occured Creating Post');
        },
        complete: () => {
          this.reloadPage();
        },
      });
    } else {
      this.isSubmitted = true;
    }
  }

  reloadPage(): void {
    window.location.reload();
  }

  getUser() {
    this.userService.getUserById(this.storage.id).subscribe((data: any) => {
      this.currentUser = data;
    });
  }
}
