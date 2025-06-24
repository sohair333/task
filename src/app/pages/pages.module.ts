import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserFormComponent } from './user-form/user-form.component';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [
    UserListComponent,
    UserFormComponent,
    UserDetailsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PagesModule { }
