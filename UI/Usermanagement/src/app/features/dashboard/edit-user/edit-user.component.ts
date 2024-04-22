import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { EditUser } from '../models/edit-user.model';
import { UserService } from '../services/user.service';
import { Permission, User } from '../models/user.model';
import { UpdateUserRequest } from '../models/update-user-request.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export class EditUserComponent implements OnDestroy {
  @Input() id: string | null = null;
  @Input() user?: EditUser;

  updateUserRequest: UpdateUserRequest;
  userPermissions: Permission[] = [
    {
      permissionId: '001',
      permissionName: 'Super Admin',
      isReadable: false,
      isWritable: false,
      isDeletable: false,
    },
    {
      permissionId: '002',
      permissionName: 'User',
      isReadable: false,
      isWritable: false,
      isDeletable: false,
    },
    {
      permissionId: '003',
      permissionName: 'Moderator',
      isReadable: false,
      isWritable: false,
      isDeletable: false,
    },
  ];

  // user?: EditUser;
  paramsSubscription?: Subscription;
  editUserSubscription?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) {
    this.updateUserRequest = {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      roleId: '',
      username: '',
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

  ngOnInit(): void {
    if (this.user?.id) {
      console.log(this.user);
      // Assuming userService.getUserById returns an Observable<User> containing permissions
      // this.userService.getUserById(this.user.id).subscribe((response) => {
      //   if (response && response.data && response.data.length > 0) {
      //     const userData = response.data[0];
      //     this.user = this.transformUserToEditUser(userData);
      //     console.log(userData)
      //     console.log(this.user)
      //     if (this.user && this.user.permissions) {
      //       this.updateUserRequest = {
      //         firstName: this.user.firstName,
      //         lastName: this.user.lastName,
      //         email: this.user.email,
      //         phone: this.user.phone,
      //         roleId: this.user.role.roleId,
      //         username: this.user.username,
      //         password: '',
            
      //         userPermissions: [],
      //       };
      //       for (const permission of this.user.permissions){
      //         console.log(permission)
      //         this.updateUserRequest.userPermissions.push({
      //           permissionId: permission.permissionId,
      //           isReadable: permission.isReadable,
      //           isWritable: permission.isWritable,
      //           isDeletable: permission.isDeletable
      //         });
      //       }
      //       // console.log(this.userPermissions);
      //       // console.log(this.updateUserRequest.userPermissions);
      //     }
      //   }
      // });
      this.updateUserRequest = {
              firstName: this.user.firstName,
              lastName: this.user.lastName,
              email: this.user.email,
              phone: this.user.phone,
              roleId: this.user.role.roleId,
              username: this.user.username,
              password: '',
            
              userPermissions: [],
            };
            for (const permission of this.user.permissions){
              console.log(permission)
              this.updateUserRequest.userPermissions.push({
                permissionId: permission.permissionId,
                isReadable: permission.isReadable,
                isWritable: permission.isWritable,
                isDeletable: permission.isDeletable
              });
            }
            console.log(this.updateUserRequest)
    }
  }

  // onPermissionChange(permissionIndex: number, type: string, newValue: boolean) {
  //   if (type === 'read') {
  //     this.updateUserRequest.userPermissions[permissionIndex].isReadable =
  //       newValue;
  //   } else if (type === 'write') {
  //     this.updateUserRequest.userPermissions[permissionIndex].isWritable =
  //       newValue;
  //   } else if (type === 'delete') {
  //     this.updateUserRequest.userPermissions[permissionIndex].isDeletable =
  //       newValue;
  //   }
  // }

  // onPermissionChange(permission: string, newValue: boolean) {
  //   if (permission === 'read') {
  //     this.updateUserRequest.userPermissions[0].isReadable = true;
  //   } else if (permission === 'write') {
  //     this.updateUserRequest.userPermissions[0].isWritable = true;
  //   } else if (permission === 'delete') {
  //     this.updateUserRequest.userPermissions[0].isDeletable = true;
  //   }
  // }

  // ngOnInit(): void {
  //   this.paramsSubscription = this.route.params.subscribe((params) => {
  //     const userId = params['id'];
  //     if (userId) {
  //       this.userService.getUserById(userId).subscribe((user: User) => {
  //         this.user = this.transformUserToEditUser(user.data[0]);
  //       });
  //     }
  //   });
  // }

  // onFormSubmit(): void {
  //   this.updateUserRequest = {
  //     firstName: this.user?.firstName ?? '',
  //     lastName: this.user?.lastName ?? '',
  //     email: this.user?.email ?? '',
  //     phone: this.user?.phone ?? '',
  //     roleId: this.user?.role.roleId ?? '',
  //     username: this.user?.username ?? '',
  //     password: this.updateUserRequest?.password ?? '',
  //     userPermissions: this.updateUserRequest?.userPermissions ?? [],
  //   };
  //   if (this.user?.id) {
  //     this.editUserSubscription = this.userService
  //       .updateUser(this.user?.id, this.updateUserRequest)
  //       .subscribe({
  //         next: (response) => {
  //           this.router.navigateByUrl('/dashboard');
  //         },
  //       });
  //   }
  // }

  onFormSubmit(): void {
    if (this.user?.id) {
      this.editUserSubscription = this.userService
        .updateUser(this.user?.id, this.updateUserRequest)
        .subscribe({
          next: (response) => {
            this.router.navigateByUrl('/dashboard');
          },
        });
    }
    // this.formSubmitted.emit();
    // this.router.navigateByUrl('/dashboard')
  }

  ngOnDestroy(): void {
    this.paramsSubscription?.unsubscribe();
    this.editUserSubscription?.unsubscribe();
  }

  // private transformUserToEditUser(userData: any): EditUser {
  //   return {
  //     id: userData.id,
  //     firstName: userData.firstName,
  //     lastName: userData.lastName,
  //     email: userData.email,
  //     phone: userData.phone,
  //     role: {
  //       roleId: userData.role.roleId,
  //       roleName: userData.role.roleName,
  //     },
  //     username: userData.username,
  //     permissions: userData.permissions,
  //   };
  // }

  // private transformUserToEditUser(userData: any): EditUser {
  //   return {
  //     id: userData.id,
  //     firstName: userData.firstName,
  //     lastName: userData.lastName,
  //     email: userData.email,
  //     phone: userData.phone,
  //     role: {
  //       roleId: userData.role.roleId,
  //       roleName: userData.role.roleName,
  //     },
  //     username: userData.username,
  //     // password: userData.password,
  //     dateTime: userData.data,
  //     date: userData.date,
  //     permissions: userData.permissions,
  //   };
  // }
}
