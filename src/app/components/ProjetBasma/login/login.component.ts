import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../../service/app.config.service';
import { AppConfig } from '../../../api/appconfig';
import { Subscription } from 'rxjs';
import {User} from "../../../controller/model/user";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {MessageService} from "primeng/api";
import {Router} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {Userauth} from "../../../controller/model/userauth";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles:[`
    :host ::ng-deep .p-password input {
    width: 100%;
    padding:1rem;
    }

    :host ::ng-deep .pi-eye{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }

    :host ::ng-deep .pi-eye-slash{
      transform:scale(1.6);
      margin-right: 1rem;
      color: var(--primary-color) !important;
    }
  `],
    providers: [MessageService]
})
export class LoginComponent implements OnInit, OnDestroy {

  valCheck: string[] = ['remember'];

  password: string;
  username: string;

  config: AppConfig;

  subscription: Subscription;

  constructor(public configService: ConfigService, private router: Router,private messageService: MessageService, public auth: AuthentificationService){ }

  ngOnInit(): void {
      this.User = new User();
      this.UserAuth = new Userauth();
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });
  }
    get User(): User {
        return this.auth.User;
    }
    get submitted(): boolean {
        return this.auth.submitted;
    }

    set submitted(value: boolean) {
        this.auth.submitted = value;
    }



    get UserAuth(): Userauth {
        return this.auth.UserAuth;
    }

    set UserAuth(value: Userauth) {
        this.auth.UserAuth = value;
    }
    public Login(username: string, pass :string) {
        this.submitted = true;
            this.auth.Login(username,pass).subscribe(data => {
               this.UserAuth =data.body;
                this.User = this.UserAuth.user;
                console.log('tken: ' + this.UserAuth.accessToken);
                console.log('us: ' + JSON.stringify(this.User));
                this.messageService.add({
                    key: 'tst',
                    severity: 'success',
                    summary: 'Success Message',
                    detail: ' Connected'
                });
                if(this.User.role.name == 'user') {

                    this.router.navigate(['/listAll']);

                }else if(this.User.role.name == 'admin'){
                    this.router.navigate(['/ListDoc']);
                }
            }, (errorResponse: HttpErrorResponse) => {
                console.log(errorResponse);
                alert('errorResponse');
                this.messageService.add({
                    key: 'tst',
                    severity: 'error',
                    summary: 'Error Message',
                    detail: ' Failed to Connected'
                });
            });
    }
    set User(value: User) {
        this.auth.User = value;
    }
  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
}
