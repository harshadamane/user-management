import { Component, OnDestroy, OnInit } from '@angular/core';
import { COLOR_PALLETE } from '../interface/common-ui.interface';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  Observable,
  Subscription,
  distinctUntilChanged,
  filter,
  first,
} from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { UserInfo } from '../interface/userlist';
import { UserListAction, UserListState } from '../store';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent implements OnInit, OnDestroy {
  @Select(UserListState.getUserList) userList$: Observable<UserInfo[]>;

  userDetailsForm: FormGroup;
  subs = new Subscription();
  COLOR_PALLETE = COLOR_PALLETE;
  userList: UserInfo[] = [];
  spinner = false;

  constructor(private fb: FormBuilder, private store: Store) {}

  get userFormData() {
    return this.userDetailsForm.controls['userList'];
  }

  ngOnInit(): void {
    this.userDetailsForm = this.fb.group({
      userList: this.fb.array([]),
    });

    this.store.dispatch(new UserListAction.fetchUserList());

    this.subs.add(
      this.userList$
        .pipe(
          filter((userList) => !!userList.length),
          distinctUntilChanged()
        )
        .subscribe((userList) => {
          this.userList = userList;
          this.userDetailsForm = this.fb.group({
            userList: this.fb.array([]),
          });
          const userFormArray = new FormArray([]);
          userList.forEach((user) => {
            userFormArray.push(this.createUser(user));
          });

          this.userDetailsForm.setControl('userList', userFormArray);
          console.log(
            'New/Updated user entries:',
            this.userDetailsForm.controls['userList']
          );
        })
    );
  }

  saveUserInfo(index: number) {
    if (
      this.userDetailsForm.controls['userList']['controls'][index].status ===
      'VALID'
    ) {
      const updateUseInfo =
        this.userDetailsForm.controls['userList'].value[index];
      const userId = this.userList[index].id;

      this.store.dispatch(
        new UserListAction.UpdateUserDetails({ ...updateUseInfo, id: userId })
      );
    }
  }

  deleteUser(index: number) {
    const userId = this.userList[index].id;
    this.store.dispatch(new UserListAction.DeleteUserDetails(userId));
  }

  createUser(user: UserInfo): FormGroup {
    return this.fb.group({
      firstName: [user.firstName, Validators.required],
      email: [
        user.email,
        [Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')],
      ],
      phone: [user.phone, [Validators.required]],
      birthDate: [
        user.birthDate,
        [
          Validators.pattern(
            /^(?:19|20)\d\d-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12][0-9]|3[01])$/
          ),
        ],
      ],
      university: [user.university, Validators.required],
      gender: [user.gender, Validators.required],
    });
  }
  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }
}
