import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { AddUserRequest } from '../models/add-user-request.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { PageEvent } from '@angular/material/paginator';
// import { EditUserComponent }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  users$?: Observable<User>;
  totalCount: number = 1;
  list: number[] = [];
  pageSize = 5;
  // pageSizeOptions: number[] = [5, 10, 20];
  pageNumber = 1;
  // id: string | null = null;

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.userService.getUserCount().subscribe({
      next: (value) => {
        this.totalCount = value || 0;
        this.list = new Array(Math.ceil(value / this.pageSize));

        // this.users$ = this.userService.getAllUsers(

        //   this.pageNumber,
        //   this.pageSize
        // );
        this.loadUsers();
      },
    });
  }

  onSearch(query: string) {
    this.pageNumber = 1;
    this.loadUsers(query);
  }

  sort(sortBy: string, sortDirection: string) {
    this.loadUsers(undefined, sortBy, sortDirection);
  }

  formatDateTime(dateTime: string): string {
    return moment(dateTime).format('DD-MM, YYYY');
  }

  // loadUsers(): void {
  //   this.users$ = this.userService.getAllUsers();
  // }

  handleFormSubmission(): void {
    this.loadUsers(); // Reload the list of users after form submission
    // this.users$ = this.userService.getAllUsers();
  }

  onDelete(id: string): void {
    if (id) {
      this.userService.deleteUser(id).subscribe({
        next: (response) => {
          // this.router.navigateByUrl('/dashboard');
          // this.users$ = this.userService.getAllUsers();
          this.loadUsers();
        },
      });
    }
  }

  getPage(pageNumber: number) {
    this.pageNumber = pageNumber;
    // this.users$ = this.userService.getAllUsers(this.pageNumber, this.pageSize);
    this.loadUsers();
  }

  getNextPage() {
    // if (this.pageNumber + 1 > this.list.length) {
    //   return;
    // }
    // this.pageNumber += 1;
    // // this.users$ = this.userService.getAllUsers(this.pageNumber, this.pageSize);
    // this.loadUsers();
    if (this.pageNumber * this.pageSize < this.totalCount) {
      this.pageNumber += 1;
      this.loadUsers();
    }
  }

  getPrevPage() {
    // if (this.pageNumber - 1 < 1) {
    //   return;
    // }
    // this.pageNumber -= 1;
    // // this.users$ = this.userService.getAllUsers(this.pageNumber, this.pageSize);
    // this.loadUsers();
    if (this.pageNumber > 1) {
      this.pageNumber -= 1;
      this.loadUsers();
    }
  }

  changePageSize(event: any) {
    const newSize = event.target.value;
    this.pageSize = parseInt(newSize, 10);
    this.pageNumber = 1; // Reset page number to 0
    this.loadUsers();
  }

  calculateRange(): string {
    const startIndex = (this.pageNumber - 1) * this.pageSize + 1;
    const endIndex = Math.min(this.pageNumber * this.pageSize, this.totalCount);
    return `${startIndex} - ${endIndex} of ${this.totalCount}`;
  }

  loadUsers(
    query: string = '',
    sortBy: string = '',
    sortDirection: string = ''
  ) {
    this.users$ = this.userService.getAllUsers(
      query,
      sortBy,
      sortDirection,
      this.pageNumber,
      this.pageSize
    );
    // this.list = new Array(Math.ceil((this.totalCount ?? 0) / this.pageSize));
  }

  // handlePageEvent(event: PageEvent) {
  //   this.pageNumber = event.pageIndex;
  //   this.pageSize = event.pageSize;
  //   this.loadUsers();
  // }
}
