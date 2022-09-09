import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';
import { PublicModule } from '../../public.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatButtonModule } from '@angular/material/button';
import { UserDogListComponent } from './components/user-dog-list/user-dog-list.component';
import { UserCreateDogFormComponent } from './components/user-create-dog-form/user-create-dog-form.component';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AccountComponent,
    UserProfileComponent,
    UserDogListComponent,
    UserCreateDogFormComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatSelectModule,
    PublicModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class AccountModule {}
