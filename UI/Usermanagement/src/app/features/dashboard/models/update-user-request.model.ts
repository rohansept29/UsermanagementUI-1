export interface UpdateUserRequest {
  // id: string;
  username: string;
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
  permissionName?: string;
  isReadable?: boolean;
  isWritable?: boolean;
  isDeletable?: boolean;
  isActive?: boolean;
}
