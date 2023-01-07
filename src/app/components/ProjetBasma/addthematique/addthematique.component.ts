import { Component, OnInit } from '@angular/core';
import {DocumentService} from "../../../controller/service/document.service";
import {AppComponent} from "../../../app.component";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {ConfigService} from "../../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {Thematique} from "../../../controller/model/thematique";
import {Documents} from "../../../controller/model/documents";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-addthematique',
  templateUrl: './addthematique.component.html',
  styleUrls: ['./addthematique.component.scss']
})
export class AddthematiqueComponent implements OnInit {

    selectedFile : File ;
    constructor( private  service: DocumentService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService) { }
    get Thematique(): Thematique {

        return this.service.Thematique;
    }

    set Thematique(value: Thematique) {
        this.service.Thematique = value;
    }
    ngOnInit(): void {
        this.service.getAllThematique().subscribe(data=>{
            this.ListThematique = data.body;
        })
    }
    onFileChange(event) {
        this.selectedFile=<File>event.target.files[0];
    }
    get ListThematique(): Array<Thematique> {
        return this.service.ListThematique;
    }

    set ListThematique(value: Array<Thematique>) {
        this.service.ListThematique = value;
    }
    get Document(): Documents {

        return this.service.Document;
    }

    set Document(value: Documents) {
        this.service.Document = value;
    }

    get ListDocument(): Array<Documents> {

        return this.service.ListDocument2;
    }

    set ListDocument(value: Array<Documents>) {
        this.service.ListDocument2 = value;
    }
    public addDomaine() {
        this.submittedCampagne = true;
        this.service.createThematique().subscribe(data => {
            this.service.getAllThematique().subscribe(data=>{
                this.ListThematique = data.body;
            })
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' Domaine Added',
                life:3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add domaine',
                life:3000
            });
        });
        this.Thematique = new Thematique();
        this.createDialogThem = false;
    }
    public hideCreateDialog() {
        this.submittedCampagne = false;
        this.createDialogThem = false;
    }
    get submittedCampagne(): boolean {
        return this.offre.submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this.offre.submittedCampagne = value;
    }
    get createDialogThem(): boolean {
        return this.offre.createDialogThem;
    }

    set createDialogThem(value: boolean) {
        this.offre.createDialogThem = value;
    }

}
