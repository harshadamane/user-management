import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import * as UserListAction from './userList.action';
import { UserListService } from '../services/user-list.service';
import { UserInfo, UserListApiResponse } from '../interface/userlist';
import { patch, removeItem, updateItem } from '@ngxs/store/operators';

export interface UserListStateModel {
  userList: Partial<UserInfo[]>;
}

@State<UserListStateModel>({
  name: 'user_list',
  defaults: {
    userList: [],
  },
})
@Injectable()
export class UserListState {
  constructor(private _userListService: UserListService) {}
  @Selector()
  static getUserList(state: UserListStateModel): UserInfo[] {
    return state.userList;
  }

  @Action(UserListAction.fetchUserList)
  UserList(ctx: StateContext<UserListStateModel>): void {
    if (!ctx.getState().userList.length) {
      this._userListService.getUserList().subscribe({
        next: (res: UserListApiResponse) => {
          console.log('data received', res);

          ctx.patchState({ userList: res.users });
        },
        error: (err: HttpErrorResponse) => {
          console.log(err);
        },
      });
    }
  }

  @Action(UserListAction.UpdateUserDetails)
  UpdateUser(
    ctx: StateContext<UserListStateModel>,
    action: UserListAction.UpdateUserDetails
  ): void {
    const { data } = action;

    console.log('updated Data to be store', data);
    ctx.setState(
      patch<UserListStateModel>({
        userList: updateItem<UserInfo>((user) => user.id === data.id, {
          ...data,
        } as UserInfo),
      })
    );
    console.log('Updated Store User List:', ctx.getState().userList);
  }

  @Action(UserListAction.DeleteUserDetails)
  DeleteUser(
    ctx: StateContext<UserListStateModel>,
    action: UserListAction.DeleteUserDetails
  ): void {
    console.log('Delete User Data', action.userId);
    ctx.setState(
      patch<UserListStateModel>({
        userList: removeItem<UserInfo>((user) => user.id === action.userId),
      })
    );
    console.log(
      'Updated Store User List (Deleted Action):',
      ctx.getState().userList
    );
  }
}
