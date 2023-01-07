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
  selector: 'app-ajout-user',
  templateUrl: './ajout-user.component.html',
  styleUrls: ['./ajout-user.component.scss']
})
export class AjoutUserComponent implements OnInit {

    constructor(public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService, public  users: UserService) { }

  ngOnInit(): void {
  }
    get userA(): User {
        return this.users.user;
    }

    set userA(value: User) {
        this.users.user = value;
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
    public addUser() {
        this.submitted = true;
        this.users.addUser().subscribe(data => {
            this.users.FindAllUsers().subscribe(
                data => {
                    this.userList= data;
                }
            );
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' User Added',
                life:3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add user',
                life:3000
            });
        });
        this.createDialog = false;
        this.userA = new User();
    }
    public hideCreateDialog() {
        this.submitted= false;
        this.createDialog = false;
    }
}
