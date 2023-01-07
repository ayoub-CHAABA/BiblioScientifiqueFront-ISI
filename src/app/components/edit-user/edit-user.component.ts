import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../controller/service/user.service";
import {User} from "../../controller/model/user";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit {

    constructor(public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService, public  users: UserService) { }

    ngOnInit(): void {
    }
    get userA(): User {
        return this.users.SelectedUser;
    }

    set userA(value: User) {
        this.users.SelectedUser = value;
    }
    get submitted(): boolean {
        return this.users.submitted;
    }

    set submitted(value: boolean) {
        this.users.submitted = value;
    }

    get createDialog(): boolean {
        return this.users.createDialog;
    }

    set createDialog(value: boolean) {
        this.users.createDialog = value;
    }
    get userList(): Array<User> {
        return this.users.userList;
    }

    set userList(value: Array<User>) {
        this.users.userList = value;
    }
    get editDialog(): boolean {
        return this.users.editDialog;
    }

    set editDialog(value: boolean) {
        this.users.editDialog = value;
    }
    public EditUser(use:User) {
        this.submitted = true;
        this.users.updateUser(use).subscribe(data => {
            this.users.FindAllUsers().subscribe(
                data => {
                    this.userList= data;
                }
            );
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' User Edited',
                life:3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to edit user',
                life:3000
            });
        });
        this.userA = new User();
        this.createDialog = false;
    }
    public hideCreateDialog() {
        this.submitted= false;
        this.editDialog = false;
    }
}
