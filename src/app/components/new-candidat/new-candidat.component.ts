import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../../controller/service/document.service";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {UserService} from "../../controller/service/user.service";


@Component({
  selector: 'app-new-candidat',
  templateUrl: './new-candidat.component.html',
  styleUrls: ['./new-candidat.component.scss']
})
export class NewCandidatComponent implements OnInit {


    constructor(public cand: DocumentService, public app: AppComponent, public auth: AuthentificationService, public configService: ConfigService, private router: Router, private offre: OffreService, private  messageService: MessageService, public  users: UserService) { }

    ngOnInit(): void {
    }


    get submitted(): boolean {
        return this.cand.submittedNewCandidat;
    }

    set submitted(value: boolean) {
        this.cand.submittedNewCandidat = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogNewCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogNewCandidat = value;
    }

    public addCandidat() {
        this.submitted = true;

        this.createDialogCandidat = false;
    }
    public hideCreateDialog() {
        this.submitted= false;
        this.createDialogCandidat = false;
    }
}
