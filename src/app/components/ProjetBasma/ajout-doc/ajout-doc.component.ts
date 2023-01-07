import { Component, OnInit } from '@angular/core';
import {AppComponent} from "../../../app.component";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {ConfigService} from "../../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../../controller/service/offre.service";
import {MessageService} from "primeng/api";
import {Thematique} from "../../../controller/model/thematique";
import {DocumentService} from "../../../controller/service/document.service";
import {Documents} from "../../../controller/model/documents";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-ajout-doc',
  templateUrl: './ajout-doc.component.html',
  styleUrls: ['./ajout-doc.component.scss']
})
export class AjoutDocComponent implements OnInit {
    selectedFile : File ;
    constructor( private  service: DocumentService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService, private  messageService: MessageService) { }

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
    public addOffre() {
        this.submittedCampagne = true;
        const visi= "false";
        const byteCharacters = atob(this.selectedFile.webkitRelativePath);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: this.selectedFile.type });
        console.log('hnaaaaaaaa '+byteArray);
        const data: FormData = new FormData();
        data.append('file', this.selectedFile,this.selectedFile.name);
       // @ts-ignore
        data.append('visi', this.Document.visibilite);
        data.append('them', this.Document.thematique.id);
        data.append('user', this.auth.User.id);
        data.append('type',this.Document.typeDoc);
        data.append('date',new Date(this.Document.dateDoc).toUTCString());
        this.service.createDocument(data).subscribe(data => {
              this.service.getMyDocument().subscribe(data=>{
                    this.ListDocument = data.body;
                })
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' Document Added',
                life:3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to add Document',
                life:3000
            });
        });
        this.Document = new Documents();
        this.createDialogCampagne = false;
    }
    public hideCreateDialog() {
        this.submittedCampagne = false;
        this.createDialogCampagne = false;
    }
    get submittedCampagne(): boolean {
        return this.offre.submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this.offre.submittedCampagne = value;
    }
    get createDialogCampagne(): boolean {
        return this.offre.createDialog;
    }

    set createDialogCampagne(value: boolean) {
        this.offre.createDialog = value;
    }



}
