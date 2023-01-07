import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {ConfigService} from "../../../service/app.config.service";
import {Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {OffreService} from "../../../controller/service/offre.service";
import {AppConfig} from "../../../api/appconfig";
import {Subscription} from "rxjs";
import {AppComponent} from "../../../app.component";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {User} from "../../../controller/model/user";
import {DocumentService} from "../../../controller/service/document.service";
import {Documents} from "../../../controller/model/documents";
import { saveAs } from "file-saver";
import {HttpErrorResponse} from "@angular/common/http";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-list-doc',
  templateUrl: './list-doc.component.html',
  styleUrls: ['./list-doc.component.scss']
})
export class ListDocComponent implements OnInit {
    sortOrder: number;
    sortField: string;
    file: File;
    pipe = new DatePipe('en-US');
    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
    data: FormData;
  constructor(private  messageService: MessageService, private confirmationService: ConfirmationService, public cand:DocumentService, public app: AppComponent, public auth: AuthentificationService, public configService: ConfigService, private router: Router, private offre: OffreService, private  service: DocumentService) { }

    get selectedFile(): File {
        return this.service.selectedFile;
    }

    set selectedFile(value: File) {
        this.service.selectedFile = value;
    }
    get ListDocument(): Array<Documents> {

        return this.service.ListDocument3;
    }

    set ListDocument(value: Array<Documents>) {
        this.service.ListDocument3 = value;
    }

    get ArrayDocument(): Array<Documents> {

        return this.service.ArrayDocument;
    }

    set ArrayDocument(value: Array<Documents>) {
        this.service.ArrayDocument = value;
    }

    get Document(): Documents {

        return this.service.Document;
    }

    set Document(value: Documents) {
        this.service.Document = value;
    }

    get DocumentEdite(): Documents {

        return this.service.DocumentEdite;
    }

    set DocumentEdite(value: Documents) {
        this.service.DocumentEdite = value;
    }
  ngOnInit(): void {
      if(this.User.username== null){
          this.router.navigate(['/pages/error']);
      }
      this.service.getDocument().subscribe(
      data => {
          this.ListDocument = data.body;
      }
  );
      this.app.menuMode = 'static';
      this.config = this.configService.config;
      this.subscription = this.configService.configUpdate$.subscribe(config => {
          this.config = config;
      });

  }


    downloadFile(file: any) {
        const byteCharacters = atob(file.file);
        const byteNumbers = new Array(byteCharacters.length);
        for (let i = 0; i < byteCharacters.length; i++) {
            byteNumbers[i] = byteCharacters.charCodeAt(i);
        }
        const byteArray = new Uint8Array(byteNumbers);
        const blob = new Blob([byteArray], { type: file.fileType });
        saveAs(blob, file.titre);
    }
    get createDialogCampagne(): boolean {
        return this.offre.createDialog;
    }

    set createDialogCampagne(value: boolean) {
        this.offre.createDialog = value;
    }
    get editDialogCampagne(): boolean {
        return this.offre.editDialogCampagne;
    }

    set editDialogCampagne(value: boolean) {
        this.offre.editDialogCampagne = value;
    }
    public openAjoutCampagne() {
        this.submittedCampagne = false;
        this.createDialogCampagne = true;
    }
    public FindCriter(doc: Documents) {
      this.DocumentEdite = doc;
        console.log(this.DocumentEdite);
        this.submittedCritere = false;
        this.createDialogCritere = true;

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
    get ViewCandidat(): boolean {
        return this.cand.ViewCandidat;
    }

    set ViewCandidat(value: boolean) {
        this.cand.ViewCandidat = value;
    }

    public FindCandidat() {

        this.submitted = false;
        this.ViewCandidat = true;

    }
    get submittedCampagne(): boolean {
        return this.offre.submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this.offre.submittedCampagne = value;
    }
    get User(): User {
        return this.auth.User;
    }

    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }


    get submittedCritere(): boolean {
        return this.offre.submittedCritere;
    }

    set submittedCritere(value: boolean) {
        this.offre.submittedCritere = value;
    }

    get createDialogCritere(): boolean {
        return this.offre.createDialogCritere;
    }

    set createDialogCritere(value: boolean) {
        this.offre.createDialogCritere = value;
    }
    deleteFile(doc: Documents) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + doc.titre + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.service.deleteDocument(doc.id).subscribe(data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Document Deleted',
                        life: 3000
                    });


                    this.service.getAllDocument().subscribe(data=>{
                        this.ListDocument = data.body;
                    })
                }, (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse);
                    alert('errorResponse');
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: ' Failed to delete document',
                        life: 3000
                    });
                });
            }
        });

        this.service.getAllDocument().subscribe(data=>{
            this.ListDocument = data.body;
        });
    }
    get submittedEditCampagne(): boolean {
        return this.offre.submittedEditCampagne;
    }

    set submittedEditCampagne(value: boolean) {
        this.offre.submittedEditCampagne = value;
    }
    public editCampagne(doc:Documents){
      this.DocumentEdite = doc;
        this.DocumentEdite.dateDoc = this.pipe.transform( this.DocumentEdite.dateDoc, 'yyyy-MM-dd');
        this.selectedFile = this.file;
      this.editDialogCampagne =true;
    }


    Validate(doc: Documents) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to validate ' + doc.titre + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.data = new FormData();
                this.data.append('id',doc.id);
                console.log(this.data);
                this.service.Validate(doc.id).subscribe(data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'Document Validated',
                        life: 3000
                    });


                    this.service.getDocument().subscribe(data=>{
                        this.ListDocument = data.body;
                    })
                }, (errorResponse: HttpErrorResponse) => {
                    console.log(errorResponse);
                    alert('errorResponse');
                    this.messageService.add({
                        severity: 'error',
                        summary: 'Error Message',
                        detail: ' Failed to validate document',
                        life: 3000
                    });
                });
            }
        });

        this.service.getDocument().subscribe(data=>{
            this.ListDocument = data.body;
        });
    }
}
