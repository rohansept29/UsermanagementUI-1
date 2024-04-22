export interface AddUserRequest {
  id: string;
  userName: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
  email: string;
  roleId: string;
  // createDate: Date;
  // role: Role;
  userPermissions: UserPermission[];
}
// export interface Role {
//   roleId: string;
//   roleName: string;
// }
export interface UserPermission {
  // userId: string;
  permissionId: string;
  isReadable?: boolean;
  isWritable?: boolean;
  isDeletable?: boolean;
  isActive?: boolean;
}
