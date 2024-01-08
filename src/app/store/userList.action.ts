import { UserInfo } from '../interface/userlist';

export class fetchUserList {
  static readonly type = '[Users] Fetch User List';
}

export class UpdateUserDetails {
  static readonly type = '[Users] Update User List';
  constructor(public readonly data: Partial<UserInfo>) {}
}

export class DeleteUserDetails {
  static readonly type = '[Users] Delete User From List';
  constructor(public readonly userId: number) {}
}
