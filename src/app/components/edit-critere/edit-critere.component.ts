import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {MessageService} from "primeng/api";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";

import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-critere',
  templateUrl: './edit-critere.component.html',
  styleUrls: ['./edit-critere.component.scss']
})
export class EditCritereComponent implements OnInit {


    constructor(public app: AppComponent, private  messageService: MessageService,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

    ngOnInit(): void {
    }

    get editDialogCritere(): boolean {
        return this.offre.editDialogCritere;
    }

    set editDialogCritere(value: boolean) {
        this.offre.editDialogCritere = value;
    }
    get submittedNewCritere(): boolean {
        return this.offre.submittedNewCritere;
    }

    set submittedNewCritere(value: boolean) {
        this.offre.submittedNewCritere = value;
    }

    public EditCritere() {
        this.submittedNewCritere = true;

        this.editDialogCritere = false;
    }
    public hideCreateDialog() {
        this.submittedNewCritere= false;
        this.editDialogCritere = false;
    }
}
