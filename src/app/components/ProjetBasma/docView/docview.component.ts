import {Component, ElementRef, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {Table} from "primeng/table";
import {AppConfig} from "../../../api/appconfig";
import {Subscription} from "rxjs";
import {AppComponent} from "../../../app.component";
import {AuthentificationService} from "../../../controller/service/authentification.service";
import {ConfigService} from "../../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../../controller/service/offre.service";
import {ConfirmationService, MessageService} from "primeng/api";
import { GcPdfViewer } from '@grapecity/gcpdfviewer';
import {Documents} from "../../../controller/model/documents";
import {DocumentService} from "../../../controller/service/document.service";
import {DomSanitizer} from "@angular/platform-browser";
@Pipe({name: 'safe'})
export class SafePipe implements PipeTransform {
    constructor(private sanitizer: DomSanitizer) {
    }

    transform(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
}
@Component({
  selector: 'app-docview',
  templateUrl: './docview.component.html',
  styleUrls: ['./docview.component.scss']
})
export class DocviewComponent implements OnInit{
    PathReportString:any;
    title = 'viewer-app';
    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    file:any;
     url:any;
    @ViewChild('filter') filter: ElementRef;
    constructor(private sanitizer: DomSanitizer,private service: DocumentService,private  messageService: MessageService,private confirmationService: ConfirmationService,public app: AppComponent,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }

    get DocumentEdite(): Documents {

        return this.service.DocumentEdite;
    }

    set DocumentEdite(value: Documents) {
        this.service.DocumentEdite = value;
    }

    ngOnInit(): void{
        this.file=this.DocumentEdite.file;
        console.log(this.file);
        //this.PathReportString = 'data:application/pdf;base64,' + (this.sanitizer.bypassSecurityTrustResourceUrl(this.file) as any).changingThisBreaksApplicationSecurity;

        console.log(this.PathReportString);

    }



    get createDialogCritere(): boolean {
        return this.offre.createDialogCritere;
    }

    set createDialogCritere(value: boolean) {
        this.offre.createDialogCritere = value;
    }





}
