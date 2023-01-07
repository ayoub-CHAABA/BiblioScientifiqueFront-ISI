import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OffreService {
    private _url = environment.baseUrl;
    private _submitted: boolean;
    private _submittedCampagne: boolean;
    private _submittedEditCampagne: boolean;
    private _submittedCritere: boolean;
    private _submittedNewCritere: boolean;
    private _createDialog: boolean;
    private _editDialogCampagne: boolean;
    private _editDialogCritere: boolean;
    private _createDialogCritere: boolean;
    private _createDialogNewCritere: boolean;
    private _createDialogThem: boolean;
    private _createDialogEditeThem: boolean;

    constructor(private http: HttpClient) { }


    get createDialogThem(): boolean {
        return this._createDialogThem;
    }

    set createDialogThem(value: boolean) {
        this._createDialogThem = value;
    }
   get createDialogEditeThem(): boolean {
        return this._createDialogEditeThem;
    }

    set createDialogEditeThem(value: boolean) {
        this._createDialogEditeThem = value;
    }

    get editDialogCampagne(): boolean {
        return this._editDialogCampagne;
    }

    set editDialogCampagne(value: boolean) {
        this._editDialogCampagne = value;
    }get editDialogCritere(): boolean {
        return this._editDialogCritere;
    }

    set editDialogCritere(value: boolean) {
        this._editDialogCritere = value;
    }

    get submittedCritere(): boolean {
        return this._submittedCritere;
    }

    set submittedCritere(value: boolean) {
        this._submittedCritere = value;
    }

    get createDialogCritere(): boolean {
        return this._createDialogCritere;
    }

    set createDialogCritere(value: boolean) {
        this._createDialogCritere = value;
    }

    get submittedNewCritere(): boolean {
        return this._submittedNewCritere;
    }

    set submittedNewCritere(value: boolean) {
        this._submittedNewCritere = value;
    }

    get createDialogNewCritere(): boolean {
        return this._createDialogNewCritere;
    }

    set createDialogNewCritere(value: boolean) {
        this._createDialogNewCritere = value;
    }

    get createDialog(): boolean {
        return this._createDialog;
    }

    set createDialog(value: boolean) {
        this._createDialog = value;
    }
    get submittedCampagne(): boolean {
        return this._submittedCampagne;
    }

    set submittedCampagne(value: boolean) {
        this._submittedCampagne = value;
    }
get submittedEditCampagne(): boolean {
        return this._submittedEditCampagne;
    }

    set submittedEditCampagne(value: boolean) {
        this._submittedEditCampagne = value;
    }

    get submitted(): boolean {
        return this._submitted;
    }

    set submitted(value: boolean) {
        this._submitted = value;
    }

    get url(): string {
        return this._url;
    }

    set url(value: string) {
        this._url = value;
    }





}
