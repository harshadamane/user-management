import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiResponse } from '../interface/api-response-generic.interface';
import { UserListApiResponse } from '../interface/userlist';

@Injectable({
  providedIn: 'root',
})
export class UserListService {
  constructor(private _http: HttpClient) {}
  private url = 'https://dummyjson.com/users';

  getUserList(): Observable<UserListApiResponse> {
    return this._http.get<UserListApiResponse>(`${this.url}`);
  }
}
