import { HeaderPrimaryComponent } from './../../partials/header-primary/header-primary.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PetsRoutingModule } from './pets-routing.module';
import { PetsComponent } from './pets.component';
import { PublicModule } from '../../public.module';
import { PetListingComponent } from './components/pet-listing/pet-listing.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [PetsComponent, PetListingComponent],
  imports: [
    CommonModule,
    PetsRoutingModule,
    PublicModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    // FormsModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class PetsModule {}
