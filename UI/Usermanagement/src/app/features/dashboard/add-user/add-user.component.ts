import {
  Component,
  ElementRef,
  EventEmitter,
  OnDestroy,
  Output,
  ViewChild,
} from '@angular/core';
import { AddUserRequest } from '../models/add-user-request.model';
import { Subscription } from 'rxjs';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent implements OnDestroy {
  @ViewChild('addUserModal') addUserModal: any;

  model: AddUserRequest;

  private addUserSubscription?: Subscription;

  // @Output() formSubmitted: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private userService: UserService,
    private router: Router,
    private elRef: ElementRef
  ) {
    this.model = {
      id: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '2',
      userName: '',
      password: '',
      userPermissions: [
        {
          permissionId: '001',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
        {
          permissionId: '002',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
        {
          permissionId: '003',
          isReadable: false,
          isWritable: false,
          isDeletable: false,
        },
      ],
    };
  }

  onPermissionChange(permission: string, newValue: boolean) {
    if (permission === 'read') {
      this.model.userPermissions[0].isReadable = true;
    } else if (permission === 'write') {
      this.model.userPermissions[0].isWritable = true;
    } else if (permission === 'delete') {
      this.model.userPermissions[0].isDeletable = true;
    }
  }

  onFormSubmit() {
    this.addUserSubscription = this.userService.addUser(this.model).subscribe({
      next: (response) => {
        console.log('User added successfully!');
        // Reset the form fields if needed
        this.model = {
          id: '',
          firstName: '',
          lastName: '',
          email: '',
          phone: '',
          roleId: '2',
          userName: '',
          password: '',
          userPermissions: [
            {
              permissionId: '001',
              isReadable: false,
              isWritable: false,
              isDeletable: false,
            },
            {
              permissionId: '002',
              isReadable: false,
              isWritable: false,
              isDeletable: false,
            },
            {
              permissionId: '003',
              isReadable: false,
              isWritable: false,
              isDeletable: false,
            },
          ],
        };
        // this.formSubmitted.emit();
        this.router.navigateByUrl('/dashboard')
      },
      error: (error) => {
        console.error('Error adding user:', error);
      },
    });
  }

  ngOnDestroy(): void {
    this.addUserSubscription?.unsubscribe();
  }

}
