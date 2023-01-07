import {Thematique} from "./thematique";
import {User} from "./user";

export class Documents {
    public id:string;
    public  titre:string;
    public  nmbrTelechargement: number;
    public  nmbrVue:number;
    public  statut:boolean;
    public  visibilite:boolean;
    public  datePubl= new Date().getFullYear()+'-'+new Date().getMonth()+'-'+ new Date().getDay();
    public  dateDoc= new Date().getFullYear()+'-'+new Date().getMonth()+'-'+ new Date().getDay();
    public typeDoc:string;
    public thematique: Thematique;
    public  user:User;
    public  fileType:string;
    public  fileSize:number;
    public  file:string[];
}
