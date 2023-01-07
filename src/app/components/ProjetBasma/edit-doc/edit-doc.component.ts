import { Component, OnInit } from '@angular/core';
import {ConfirmationService, MessageService} from "primeng/api";
import {DocumentService} from "../../../controller/service/document.service";
import {AppComponent} from "../../../app.component";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {ConfigService} from "../../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../../controller/service/offre.service";
import {Documents} from "../../../controller/model/documents";
import {Thematique} from "../../../controller/model/thematique";
import {HttpErrorResponse} from "@angular/common/http";

@Component({
  selector: 'app-edit-doc',
  templateUrl: './edit-doc.component.html',
  styleUrls: ['./edit-doc.component.scss']
})
export class EditDocComponent implements OnInit {
    selectedFile : File ;
d= new Date();
     file: any;
    constructor(private service: DocumentService,private  messageService: MessageService, private confirmationService: ConfirmationService, public cand:DocumentService, public app: AppComponent, public auth: AuthentificationService, public configService: ConfigService, private router: Router, private offre: OffreService) { }

    ngOnInit(): void {
        if(this.selectedFile == null){
        console.log('null');}
        console.log(this.DocumentEdite)
        this.service.getAllThematique().subscribe(data=>{
            this.ListThematique = data.body;
        })
    }
    get selectedFile2(): File {
        return this.service.selectedFile;
    }

    set selectedFile2(value: File) {
        this.service.selectedFile = value;
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

    get DocumentEdite(): Documents {

        return this.service.DocumentEdite;
    }

    set DocumentEdite(value: Documents) {
        this.service.DocumentEdite = value;
    }
    get editDialogCampagne(): boolean {
        return this.offre.editDialogCampagne;
    }

    set editDialogCampagne(value: boolean) {
        this.offre.editDialogCampagne = value;
    }

    public editOffre() {
        this.file =this.DocumentEdite.file;
        const byteCharacters = atob(this.file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: this.DocumentEdite.fileType });
        const data: FormData = new FormData();

        if(this.selectedFile ==null){
            // @ts-ignore
            data.append('file', blob,this.DocumentEdite.titre)
        }else{
        data.append('file', this.selectedFile,this.selectedFile.name);
        }
        // @ts-ignore
        data.append('visi', this.DocumentEdite.visibilite);
        data.append('them', this.DocumentEdite.thematique.id);
        data.append('user', this.auth.User.id);
        data.append('type',this.DocumentEdite.typeDoc);
        data.append('date',new Date(this.DocumentEdite.dateDoc).toUTCString());
        data.append('id',this.DocumentEdite.id);
        this.service.editeDocument(data).subscribe(data => {
            this.service.getMyDocument().subscribe(data=>{
                this.ListDocument = data.body;
            })
            this.messageService.add({
                severity: 'success',
                summary: 'Success Message',
                detail: ' Document edited',
                life:3000
            });
        }, (errorResponse: HttpErrorResponse) => {
            console.log(errorResponse);
            alert('errorResponse');
            this.messageService.add({
                key: 'tst',
                severity: 'error',
                summary: 'Error Message',
                detail: ' Failed to edite Document',
                life:3000
            });
        });
        this.DocumentEdite = new Documents();
        this.editDialogCampagne = false;

    }
    public hideCreateDialog() {
        this.editDialogCampagne = false;
    }
}
