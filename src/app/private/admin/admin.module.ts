import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { UserTableComponent } from './components/user-table/user-table.component';
import { DeleteUserDialogComponent } from './components/delete-user-dialog/delete-user-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewUserDialogComponent } from './components/new-user-dialog/new-user-dialog.component';
import { DogTableComponent } from './components/dog-table/dog-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NewDogComponent } from './components/new-dog/new-dog.component';
import { EditUserDialogComponent } from './components/edit-user-dialog/edit-user-dialog.component';

@NgModule({
  declarations: [
    AdminComponent,
    UserTableComponent,
    DeleteUserDialogComponent,
    NewUserDialogComponent,
    DogTableComponent,
    NewDogComponent,
    EditUserDialogComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule,
    FormsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
  ],
})
export class AdminModule {}
