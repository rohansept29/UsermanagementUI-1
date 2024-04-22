// edit-user.model.ts

export interface EditUser {
  id: any;
  firstName: any;
  lastName: any;
  email: any;
  phone: any;
  role: {
    roleId: any;
    roleName: any;
  };
  username: any;
  // date?: string;
  dateTime?: string;
  permissions: {
    permissionId: string;
    permissionName?: string;
    isReadable: boolean;
    isWritable: boolean;
    isDeletable: boolean;
  }[];
}
