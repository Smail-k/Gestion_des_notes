import { Promotion } from "./promotion";
import { mobilite } from "./mobilite";
export class Etudiant {
    id?: number;
    nom?:string;
    prenom?:string;
    annee?:string;
    numero?:string;
    promotion_id?:Promotion; 
    mobilite?:mobilite;    
}
