import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../controller/service/user.service";

import {DocumentService} from "../../controller/service/document.service";

@Component({
  selector: 'app-postuler',
  templateUrl: './postuler.component.html',
  styleUrls: ['./postuler.component.scss']
})
export class PostulerComponent implements OnInit {
 i:number =0;

    constructor(public cand: DocumentService, public app: AppComponent, public auth: AuthentificationService, public configService: ConfigService, private router: Router, private offre: OffreService, private  messageService: MessageService, public  users: UserService) { }

    ngOnInit(): void {
    }


    public next(){
        document.getElementById('option-1').style.backgroundColor= '#fff';
        document.getElementById('option-1').style.borderColor= '#fff';
        document.getElementById('option-2').style.backgroundColor='#fff';
        document.getElementById('option-2').style.borderColor='#fff';

    }


    get submitted(): boolean {
        return this.cand.submitted;
    }

    set submitted(value: boolean) {
        this.cand.submitted = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogCandidat = value;
    }
    get createDialogCandidatRespCriter(): boolean {
        return this.cand.createDialogCandidatRespCriter;
    }

    set createDialogCandidatRespCriter(value: boolean) {
        this.cand.createDialogCandidatRespCriter = value;
    }



    public addCandidat() {

        this.createDialogCandidat = false;
    }

    public hideCreateDialog() {
        this.submitted= false;
        this.createDialogCandidat = false;
    }
    public hideCreateDialogRes() {
        this.submitted= false;
        this.createDialogCandidatRespCriter = false;
    }
}
