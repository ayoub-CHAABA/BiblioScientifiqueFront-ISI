import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DocumentService} from "../../controller/service/document.service";
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {User} from "../../controller/model/user";
import {AppConfig} from "../../api/appconfig";
import {Subscription} from "rxjs";
import {Table} from "primeng/table";

@Component({
  selector: 'app-list-candidat',
  templateUrl: './list-candidat.component.html',
  styleUrls: ['./list-candidat.component.scss']
})
export class ListCandidatComponent implements OnInit {
    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
    constructor(public cand:DocumentService, public app: AppComponent, public auth: AuthentificationService, public configService: ConfigService, private router: Router, private offre: OffreService) { }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
  ngOnInit(): void {
      this.createDialogCandidatResp = false;
      // if(this.User.username== null){
      //     this.router.navigate(['/pages/error']);
      // }
  }
    get User(): User {
        return this.auth.User;
    }
    get submitted(): boolean {
        return this.cand.submittedNewCandidat;
    }

    set submitted(value: boolean) {
        this.cand.submittedNewCandidat = value;
    }
    get ViewCandidat(): boolean {
        return this.cand.ViewCandidat;
    }

    set ViewCandidat(value: boolean) {
        this.cand.ViewCandidat = value;
    }

    get createDialogCandidat(): boolean {
        return this.cand.createDialogNewCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this.cand.createDialogNewCandidat = value;
    }

    get createDialogCandidatResp(): boolean {
        return this.cand.createDialogCandidatResp;
    }

    set createDialogCandidatResp(value: boolean) {
        this.cand.createDialogCandidatResp = value;
    }
    public openCandidatRes(){

                this.createDialogCandidatResp = true;



    }



    public addCandidat() {
        this.submitted = false;
        this.createDialogCandidat = true;
    }
}
