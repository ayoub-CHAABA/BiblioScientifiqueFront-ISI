import { Component, OnDestroy } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import {Router} from "@angular/router";
import {AuthentificationService} from "./controller/service/authentification.service";
import {User} from "./controller/model/user";
import {AppComponent} from "./app.component";
import {StyleClass} from "primeng/styleclass/styleclass";

@Component({
    selector: 'app-topbar',
    templateUrl: './app.topbar.component.html'
})
export class AppTopBarComponent {

    items: MenuItem[];

    constructor(public appMain: AppMainComponent,public app:AppComponent,public router: Router, private auth: AuthentificationService) { }
    get User(): User {
        return this.auth.User;
    }
    set User(value: User) {
        this.auth.User = value;
    }
    public logOut() {
        this.app.menuMode = 'overlay';
        this.User = null;
        this.router.navigate(['/']);

    }
}
