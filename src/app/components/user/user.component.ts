import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {AuthentificationService} from "../../controller/service/authentification.service";
import {ConfigService} from "../../service/app.config.service";
import {Router} from "@angular/router";
import {OffreService} from "../../controller/service/offre.service";
import {User} from "../../controller/model/user";
import {UserService} from "../../controller/service/user.service";
import {Table} from "primeng/table";
import {AppConfig} from "../../api/appconfig";
import {Subscription} from "rxjs";
import {ConfirmationService, MessageService} from "primeng/api";

@Component({
  selector: 'app-user',
  templateUrl: '../ProjetBasma/user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
    config: AppConfig;
    subscription: Subscription;
    @ViewChild('dt') table: Table;
    loading:boolean = true;
    @ViewChild('filter') filter: ElementRef;
    constructor(public app: AppComponent, private  messageService: MessageService,private confirmationService: ConfirmationService, public users: UserService,public auth: AuthentificationService,public configService: ConfigService, private router: Router,private offre: OffreService) { }
    get User(): User {
        return this.auth.User;
    }
  ngOnInit(): void {
      if(this.User.username== null){
          this.router.navigate(['/pages/error']);
      }
      this.users.FindAllUsers().subscribe(
          data => {
              this.userList = data;
          }
      );
  }
    get userItems(): Array<User> {
        return this.users.userItems;
    }

    set userItems(value: Array<User>) {
        this.users.userItems = value;
    }
    get userA(): User {
        return this.users.user;
    }

    set userA(value: User) {
        this.users.user = value;
    }

    get userList(): Array<User> {
        return this.users.userList;
    }

    set userList(value: Array<User>) {
        this.users.userList = value;
    }

    get submitted(): boolean {
        return this.users.submitted;
    }

    set submitted(value: boolean) {
        this.users.submitted = value;
    }

    get createDialog(): boolean {
        return this.users.createDialog;
    }

    set createDialog(value: boolean) {
        this.users.createDialog = value;
    }
    public openAjoutUser() {
        this.submitted = false;
        this.createDialog = true;
        this.userA = new User();
    }
    clear(table: Table) {
        table.clear();
        this.filter.nativeElement.value = '';
    }
    get editDialog(): boolean {
        return this.users.editDialog;
    }

    set editDialog(value: boolean) {
        this.users.editDialog = value;
    }
    public delete(us: User) {
        this.userA = us;
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + us.username + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.users.DeleteUsers(us).subscribe(data => {
                    this.messageService.add({
                        severity: 'success',
                        summary: 'Successful',
                        detail: 'User Deleted',
                        life: 3000
                    });

                    this.users.FindAllUsers().subscribe(
                        data => {
                            this.userList = data;
                        }
                    );
                });
            }
        });
        this.users.FindAllUsers().subscribe(
            data => {
                this.userList = data;
            }
        );
    }

    public editUser(us: User) {
        this.SelectedUser = {...us};
        this.editDialog = true;
    }
    get SelectedUser(): User {
        return this.users.SelectedUser;
    }

    set SelectedUser(value: User) {
        this.users.SelectedUser = value;
    }
}
