import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { SidebarComponent } from './core/components/sidebar/sidebar.component';
import { DashboardComponent } from './features/dashboard/dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from'@angular/common/http';
import { EditUserComponent } from './features/dashboard/edit-user/edit-user.component';
import { AddUserComponent } from './features/dashboard/add-user/add-user.component';
// import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DocumentsListComponent } from './features/documents/documents-list/documents-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    DashboardComponent,
    EditUserComponent,
    AddUserComponent,
    DocumentsListComponent,
    // FormsModule,
    // ReactiveFormsModule,
    // MatPaginatorModule,
    // MatFormFieldModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
