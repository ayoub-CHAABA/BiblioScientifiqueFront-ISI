import { Component, OnInit, OnDestroy } from '@angular/core';
import { ConfigService } from '../../service/app.config.service';
import { AppConfig } from '../../api/appconfig';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import {AppComponent} from "../../app.component";
import {OffreService} from "../../controller/service/offre.service";
import {User} from "../../controller/model/user";
import {UserService} from "../../controller/service/user.service";
import {DocumentService} from "../../controller/service/document.service";
@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./land.scss']
})
export class LandingComponent implements OnInit, OnDestroy {

  config: AppConfig;

  subscription: Subscription;

  constructor(public cand:DocumentService , public users: UserService, public configService: ConfigService, public app: AppComponent, public router: Router, private offre: OffreService) { }

  ngOnInit(): void {
      this.app.menuMode = 'overlay';
    this.config = this.configService.config;
    this.subscription = this.configService.configUpdate$.subscribe(config => {
      this.config = config;
    });

  }

  ngOnDestroy(): void {
    if(this.subscription){
      this.subscription.unsubscribe();
    }
  }
  OffrePage(){
      this.router.navigate(["/pages/offre"]);
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


    get submittedCand(): boolean {
        return this.cand.submitted;
    }

    set submittedCand(value: boolean) {
        this.cand.submitted = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogCandidat = value;
    }

    public openPostuler() {
        this.submittedCand = false;
        this.createDialogCandidat = true;

    }
}
