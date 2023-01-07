import { Injectable } from '@angular/core';
import {User} from "../model/user";
import {Observable} from "rxjs";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private _submitted: boolean;
    private _createDialog: boolean;
    private _editDialog: boolean;
    private _user: User;
    private _SelectedUser: User;
    private _userList: Array<User>;
    private _userItems: Array<User>;
    private _url = environment.baseUrl;
    constructor(private http: HttpClient) { }


    get editDialog(): boolean {
        return this._editDialog;
    }

    set editDialog(value: boolean) {
        this._editDialog = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }

    get user(): User {
      if(this._user==null){
          this._user= new User();
      }
        return this._user;
    }

    set user(value: User) {
        this._user = value;
    }
    get SelectedUser(): User {
      if(this._SelectedUser==null){
          this._SelectedUser= new User();
      }
        return this._SelectedUser;
    }

    set SelectedUser(value: User) {
        this._SelectedUser = value;
    }

    get userList(): Array<User> {
        if(this._userList==null){
            this._userList= new Array<User>();
        }
        return this._userList;
    }

    set userList(value: Array<User>) {
        this._userList = value;
    }

    get userItems(): Array<User> {
        if(this._userItems==null){
            this._userItems= new Array<User>();
        }
        return this._userItems;
    }

    set userItems(value: Array<User>) {
        this._userItems = value;
    }
    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }
    public FindAllUsers(): Observable<Array<User>> {
        return this.http.get<Array<User>>(this.url + 'admin/user/');

    }
    public DeleteUsers(us: User): Observable<User> {
        return this.http.delete<User>(this.url + 'admin/user/deleteUser/'+us.id);

    }
    public addUser(): Observable<User> {

        return this.http.post<User>(this.url + 'admin/user/',this.user);

    }
    public updateUser(us: User): Observable<User> {
        return this.http.put<User>(this.url + 'admin/user/',us);

    }
}
