import { Component, OnInit } from '@angular/core';
import {ConfigService} from "../../service/app.config.service";
import {AppComponent} from "../../app.component";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {User} from "../../controller/model/user";
import {TreeNode} from "primeng/api";
import {UserService} from "../../controller/service/user.service";
import {DocumentService} from "../../controller/service/document.service";

@Component({
  selector: 'app-offre-page',
  templateUrl: './offre-page.component.html',
  styleUrls: ['./offre-page.component.scss']
})
export class OffrePageComponent implements OnInit {
    files: TreeNode[];
    constructor(public cand: DocumentService, public users:UserService, public configService: ConfigService, public app: AppComponent, public router: Router, private offre: OffreService, private auth: AuthentificationService) { }

  ngOnInit(): void {
      this.files = [{
          label: "Régions",
          "children":[{
              label: "Casablanca-Mohammedia (832)",

          },{
              label: "Fès (60)",

          },{
              label: "Laâyoune (47)",

          },{
              label: "Marrakech-Safi (142)",

          },{
              label: "Meknès (47)",

          },{
              label: "Oujda (55)",

          },{
              label: "Rabat-Salé-Kénitra (203)",

          },{
              label: "Settat (50)",

          },{
              label: "Tanger-Tétouan-Al Hoceïma (144)",

          },{
              label: "Béni Mellal-Khénifra (46)",
          }]

      },{
          label: "Langues",
          "children":[
              {
              label: "Français(777)",
                  "children":[{
              label: "Courant (510)",
            },{
              label: "Bon niveau (247)",
            },{
              label: "Intermédiaire (13)",
            },{
              label: "Débutant (0)",
            }]

              }, {
              label: "Arabe(74)",
                  "children":[{
              label: "Courant (16)",
            },{
              label: "Bon niveau (6)",
            },{
              label: "Intermédiaire (0)",
            },{
              label: "Débutant (0)",
            }]

              }, {
              label: "Anglais(318)",
                  "children":[{
              label: "Courant (165)",
            },{
              label: "Bon niveau (117)",
            },{
              label: "Intermédiaire (29)",
            },{
              label: "Débutant (0)",
            }]

              }, {
                  label: "Espagnol(8)",
                  "children":[{
                      label: "Courant (3)",
                  },{
                      label: "Bon niveau (4)",
                  },{
                      label: "Intermédiaire (0)",
                  },{
                      label: "Débutant (1)",
                  }]

              }
             ]
      },{
          label: "Niveaux d'études",
          "children":[
              {
              label: "Qualification avant bac (53)",

              }, {
              label: "Bac (38)",

              }, {
              label: "Bac+1 (1)",


              }, {
                  label: "Bac+2 (465)",


              }, {
                  label: "Bac+3 (236)",


              }, {
                  label: "Bac+4 (108)",


              }, {
                  label: "Bac+5 et plus (371)",


              }
             ]
      },{
          label: "Niveaux d'expérience",
          "children":[
              {
              label: "Etudiant, jeune diplômé (21)",

              }, {
              label: "Débutant < 2 ans (202)",

              }, {
              label: "Expérience entre 2 ans et 5 ans (798)",


              }, {
                  label: "Expérience entre 5 ans et 10 ans (231)",


              }, {
                  label: "Expérience > 10 ans (20)",


              }
             ]
      },{
          label: "Types de contrat",
          "children":[
              {
              label: "CDI (745)",

              }, {
              label: "Intérim (415)",

              }, {
              label: "CDD (141)",


              }, {
                  label: "Freelance (75)",


              }, {
                  label: "Stage (22)",


              }, {
                  label: "Temps partiel (1)",


              }, {
                  label: "Alternance (0)",


              }
             ]
      },{
          label: "Métiers",
          "children":[
              {
              label: "Achats (31)",

              }, {
              label: "Commercial, vente (273)",

              }, {
              label: "Gestion, comptabilité, finance (110)",


              }, {
                  label: "Informatique, nouvelles technologies (195)",


              }, {
                  label: "Juridique (8)",


              }, {
                  label: "Management, direction générale (51)",


              }, {
                  label: "Marketing, communication (73)",


              }, {
                  label: "Métiers des services (220)",


              }, {
                  label: "RH, formation (63)",


              }, {
                  label: "Secrétariat, assistanat (78)",


              }, {
                  label: "Transport, logistique (66)",


              }
             ]
      },{
          label: "Secteurs d'activité",
          "children":[
              {
              label: "Activités associatives (3)",

              }, {
              label: "Administration publique (1)",

              }, {
              label: "Aéronautique, navale (15)",


              }, {
                  label: "Agriculture, pêche, aquaculture (13)",


              }, {
                  label: "Agroalimentaire (31)",


              }, {
                  label: "Ameublement, décoration (19)",


              }, {
                  label: "Automobile, matériels de transport, réparation (34)",


              }, {
                  label: "Banque, assurance, finances (140)",


              }, {
                  label: "BTP, construction (101)",


              }, {
                  label: "Centres d´appel, hotline, call center (147)",


              }, {
                  label: "Chimie, pétrochimie, matières premières (17)",


              }, {
                  label: "Conseil, audit, comptabilité (14)",


              }
             ]
      }
      ];

  }

    get User(): User {
        return this.auth.User;
    }
    set User(value: User) {
        this.auth.User = value;
    }


    get submittedCand(): boolean {
        return this.cand.submitted;
    }

    set submittedCand(value: boolean) {
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



    public openPostuler() {
        this.submittedCand = false;

        this.createDialogCandidatRespCriter=false;
        this.createDialogCandidat = true;

    }
}
