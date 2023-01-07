import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpEvent, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Documents} from "../model/documents";
import {AuthentificationService} from "./authentification.service";
import {Thematique} from "../model/thematique";
import {map} from "rxjs/operators";
import {Universite} from "../model/universite";
import {Role} from "../model/role";
import {User} from "../model/user";


@Injectable({
  providedIn: 'root'
})
export class DocumentService {
    private _submitted: boolean;
    private _submittedNewCandidat: boolean;
    private _createDialogCandidat: boolean;
    private _createDialogCandidatRespCriter: boolean;
    private _ViewCandidat: boolean;
    private _editDialogCandidat: boolean;
    private _createDialogNewCandidat: boolean;
    private _createDialogCandidatResp: boolean;
    private _url = environment.baseUrl
    private _ListDocument:Array<Documents>;
    private _ListDocument2:Array<Documents>;
    private _ListDocument3:Array<Documents>;
    private _ArrayDocument:Array<Documents>;
    private _Document:Documents;
    private _Thematique:Thematique;
    private _Thematique2:Thematique;
    private _DocumentEdite:Documents;
    private _ListThematique:Array<Thematique>;
    private _ArrayThematique:Array<Thematique>;
    private _selectedFile : File ;
    private _ListUniversite: Array<Universite>;
    private _ListRole: Array<Role>;
    private _addUser:User;
    constructor(private http: HttpClient,private auth:AuthentificationService) { }


    get Thematique(): Thematique {
        if (this._Thematique ==null){
            this._Thematique = new Thematique();
        }
        return this._Thematique;
    }

    set Thematique(value: Thematique) {
        this._Thematique = value;
    }
    get Thematique2(): Thematique {
        if (this._Thematique2 ==null){
            this._Thematique2 = new Thematique();
        }
        return this._Thematique2;
    }

    set Thematique2(value: Thematique) {
        this._Thematique2 = value;
    }

    get ListUniversite(): Array<Universite> {
        if (this._ListUniversite ==null){
            this._ListUniversite = new Array<Universite>();
        }
        return this._ListUniversite;
    }

    set ListUniversite(value: Array<Universite>) {
        this._ListUniversite = value;
    }

    get ListRole(): Array<Role> {
        if (this._ListRole ==null){
            this._ListRole = new Array<Role>();
        }
        return this._ListRole;
    }

    set ListRole(value: Array<Role>) {
        this._ListRole = value;
    }

    get addUser(): User {
        if (this._addUser ==null){
            this._addUser = new User();
        }
        return this._addUser;
    }

    set addUser(value: User) {
        this._addUser = value;
    }

    get selectedFile(): File {
        return this._selectedFile;
    }

    set selectedFile(value: File) {
        this._selectedFile = value;
    }

    get ListThematique(): Array<Thematique> {
        if (this._ListThematique ==null){
            this._ListThematique = new Array<Thematique>();
        }
        return this._ListThematique;
    }

    set ListThematique(value: Array<Thematique>) {
        this._ListThematique = value;
    }
    get ArrayThematique(): Array<Thematique> {
        if (this._ArrayThematique ==null){
            this._ArrayThematique = new Array<Thematique>();
        }
        return this._ArrayThematique;
    }

    set ArrayThematique(value: Array<Thematique>) {
        this._ArrayThematique = value;
    }

    get ListDocument(): Array<Documents> {
        if (this._ListDocument ==null){
            this._ListDocument = new Array<Documents>();
        }
        return this._ListDocument;
    }

    set ListDocument(value: Array<Documents>) {
        this._ListDocument = value;
    }
    get ListDocument2(): Array<Documents> {
        if (this._ListDocument2 ==null){
            this._ListDocument2 = new Array<Documents>();
        }
        return this._ListDocument2;
    }

    set ListDocument2(value: Array<Documents>) {
        this._ListDocument2 = value;
    }

    get ListDocument3(): Array<Documents> {
        if (this._ListDocument3 ==null){
            this._ListDocument3 = new Array<Documents>();
        }
        return this._ListDocument3;
    }

    set ListDocument3(value: Array<Documents>) {
        this._ListDocument3 = value;
    }
    get ArrayDocument(): Array<Documents> {
        if (this._ArrayDocument ==null){
            this._ArrayDocument = new Array<Documents>();
        }
        return this._ArrayDocument;
    }

    set ArrayDocument(value: Array<Documents>) {
        this._ArrayDocument = value;
    }

    get Document(): Documents {
        if (this._Document ==null){
            this._Document = new Documents();
        }
        return this._Document;
    }

    set Document(value: Documents) {
        this._Document = value;
    }
    get DocumentEdite(): Documents {
        if (this._DocumentEdite ==null){
            this._DocumentEdite = new Documents();
        }
        return this._DocumentEdite;
    }

    set DocumentEdite(value: Documents) {
        this._DocumentEdite = value;
    }

    get createDialogCandidatResp(): boolean {
        return this._createDialogCandidatResp;
    }

    set createDialogCandidatResp(value: boolean) {
        this._createDialogCandidatResp = value;
    }


    get ViewCandidat(): boolean {
        return this._ViewCandidat;
    }

    set ViewCandidat(value: boolean) {
        this._ViewCandidat = value;
    }



    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }
    get submittedNewCandidat(): boolean {
        return this._submittedNewCandidat;
    }

    set submittedNewCandidat(value: boolean) {
        this._submittedNewCandidat = value;
    }

    get createDialogCandidat(): boolean {
        return this._createDialogCandidat;
    }

    set createDialogCandidat(value: boolean) {
        this._createDialogCandidat = value;
    }
    get createDialogCandidatRespCriter(): boolean {
        return this._createDialogCandidatRespCriter;
    }

    set createDialogCandidatRespCriter(value: boolean) {
        this._createDialogCandidatRespCriter = value;
    }
    get createDialogNewCandidat(): boolean {
        return this._createDialogNewCandidat;
    }

    set createDialogNewCandidat(value: boolean) {
        this._createDialogNewCandidat = value;
    }

    get editDialogCandidat(): boolean {
        return this._editDialogCandidat;
    }

    set editDialogCandidat(value: boolean) {
        this._editDialogCandidat = value;
    }


    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }
    getAllDocument(): Observable<HttpResponse<Array<Documents>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Documents>>(this.url + 'api/document/documents/', {
            observe: 'response',
            headers,
        });
    }
    getDocument(): Observable<HttpResponse<Array<Documents>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Documents>>(this.url + 'api/document/', {
            observe: 'response',
            headers,
        });
    }
    getThematique(): Observable<HttpResponse<Array<Thematique>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Thematique>>(this.url + 'api/thematique/', {
            observe: 'response',
            headers,
        });
    }
    getMyDocument(): Observable<HttpResponse<Array<Documents>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Documents>>(this.url + 'api/document/doc/id/'+this.auth.User.id, {
            observe: 'response',
            headers,
        });
    }
    getAllThematique(): Observable<HttpResponse<Array<Thematique>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Thematique>>(this.url + 'api/thematique/', {
            observe: 'response',
            headers,
        });
    }
    createDocument(formData:FormData): Observable<HttpEvent<{}>>{
        const headers: HttpHeaders = this.initHeaders2();
        return this.http.post('http://localhost:8036/api/document/upload',formData, {
            observe: 'response',
            headers,
        });
    }
    createThematique(): Observable<HttpEvent<{}>>{
        const headers: HttpHeaders = this.initHeaders2();
        return this.http.post('http://localhost:8036/api/thematique/',this.Thematique, {
            observe: 'response',
            headers,
        });
    }
    editeThematique(): Observable<HttpEvent<{}>>{
        const headers: HttpHeaders = this.initHeaders2();
        console.log(this.Thematique2);
        return this.http.put('http://localhost:8036/api/thematique/',this.Thematique2, {
            observe: 'response',
            headers,
        });
    }
    editeDocument(formData:FormData): Observable<HttpEvent<{}>>{
        const headers: HttpHeaders = this.initHeaders2();
        return this.http.put('http://localhost:8036/api/document/edite',formData, {
            observe: 'response',
            headers,
        });
    }
    deleteDocument(id: string) {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.delete(`http://localhost:8036/api/document/id/${id}/`, {
            observe: 'response',
            headers
        });
    }

    Validate(id: string) {

        const headers: HttpHeaders = this.initHeaders();
        return this.http.put('http://localhost:8036/api/document/status/', id,{
            observe: 'response',
            headers
        });
    }
    initHeaders(): HttpHeaders {
        let headers = new HttpHeaders();
            headers = new HttpHeaders({
                'Content-Type': 'application/json',
                Authorization: `Bearer ${this.auth.UserAuth.accessToken}`,
            });

        return headers;
    }
    getUniversites(): Observable<HttpResponse<Array<Universite>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Universite>>(this.url + 'api/universite/', {
            observe: 'response',
            headers,
        });
    }
    getRole(): Observable<HttpResponse<Array<Role>>> {
        const headers: HttpHeaders = this.initHeaders();
        return this.http.get<Array<Role>>(this.url + 'api/role/', {
            observe: 'response',
            headers,
        });
    }
    register(): Observable<HttpResponse<User>> {
        return this.http.post<User>(this.url + 'api/auth/signup', this.addUser,{
            observe: 'response',
        });
    }
    initHeaders2(): HttpHeaders {
        let headers = new HttpHeaders();
        headers = new HttpHeaders({
            Accept: 'application/json',
            Authorization: `Bearer ${this.auth.UserAuth.accessToken}`,
        });

        return headers;
    }
}

