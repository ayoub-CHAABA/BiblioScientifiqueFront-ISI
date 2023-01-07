import { Component, OnInit } from '@angular/core';
import {AppConfig} from "../../../api/appconfig";
import {Subscription} from "rxjs";
import {ConfigService} from "../../../service/app.config.service";
import {Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {Userauth} from "../../../controller/model/userauth";
import {User} from "../../../controller/model/user";
import {Universite} from "../../../controller/model/universite";
import {Role} from "../../../controller/model/role";
import {DocumentService} from "../../../controller/service/document.service";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

    valCheck: string[] = ['remember'];

    password: string;

    config: AppConfig;

    subscription: Subscription;
    constructor(private service: DocumentService,public configService: ConfigService, private router: Router,private messageService: MessageService, public auth: AuthentificationService){ }

    ngOnInit(): void {
        this.User = new User();
        this.UserAuth = new Userauth();
        this.config = this.configService.config;
        this.service.getUniversites().subscribe(data=>{
            this.ListUniversite = data.body;
        });
        this.service.getRole().subscribe(data=>{
            this.ListRole = data.body;
        });
        this.subscription = this.configService.configUpdate$.subscribe(config => {
            this.config = config;
        });
    }
    register() {

        this.service.register().subscribe(data => {
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: 'Sign up Successfully',
                life:3000
            });
            this.addUser = new User();
            this.router.navigate(['/pages/login']);
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add',
                life:3000
            });
        });
    }
    get ListUniversite(): Array<Universite> {

        return this.service.ListUniversite;
    }

    set ListUniversite(value: Array<Universite>) {
        this.service.ListUniversite = value;
    }

    get ListRole(): Array<Role> {

        return this.service.ListRole;
    }

    set ListRole(value: Array<Role>) {
        this.service.ListRole = value;
    }

    get addUser(): User {

        return this.service.addUser;
    }

    set addUser(value: User) {
        this.service.addUser = value;
    }

    get User(): User {
        return this.auth.User;
    }
    set User(value: User) {
        this.auth.User = value;
    }
    get UserAuth(): Userauth {
        return this.auth.UserAuth;
    }

    set UserAuth(value: Userauth) {
        this.auth.UserAuth = value;
    }
    ngOnDestroy(): void {
        if(this.subscription){
            this.subscription.unsubscribe();
        }
    }

}
