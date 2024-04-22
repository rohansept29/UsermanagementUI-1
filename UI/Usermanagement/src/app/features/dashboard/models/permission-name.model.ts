export type PermissionName = Root2[];

export interface Root2 {
  status: Status;
  data: Data;
}

export interface Status {
  code: string;
  description: string;
}

export interface Data {
  permissionId: string;
  permissionName: string;
}
