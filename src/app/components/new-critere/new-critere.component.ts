import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {MessageService} from "primeng/api";


@Component({
  selector: 'app-new-critere',
  templateUrl: './new-critere.component.html',
  styleUrls: ['./new-critere.component.scss']
})
export class NewCritereComponent implements OnInit {

    constructor(public app: AppComponent, private  messageService: MessageService,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

  ngOnInit(): void {
  }

    get createDialogNewCritere(): boolean {
        return this.offre.createDialogNewCritere;
    }

    set createDialogNewCritere(value: boolean) {
        this.offre.createDialogNewCritere = value;
    }
    get submittedNewCritere(): boolean {
        return this.offre.submittedNewCritere;
    }

    set submittedNewCritere(value: boolean) {
        this.offre.submittedNewCritere = value;
    }

    public AddCritere() {
        this.submittedNewCritere = true;

        this.createDialogNewCritere = false;
    }
    public hideCreateDialog() {
        this.submittedNewCritere= false;
        this.createDialogNewCritere = false;
    }
}
