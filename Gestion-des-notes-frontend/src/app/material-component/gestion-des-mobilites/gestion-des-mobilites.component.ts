import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AfterViewInit, OnDestroy, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import DataTables from 'datatables.net';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';


import { Etudiant } from 'src/app/models/etudiant';
import { Promotion } from 'src/app/models/promotion';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { PromotionService } from 'src/app/services/promotion.service';
import { UtilisateurService } from 'src/app/services/user.service';


import { SupprimerEtudiantComponent } from 'src/app/material-component/gestion-des-etudiants/supprimer-etudiant/supprimer-etudiant.component';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { annee_universitaire } from 'src/app/models/annee_universitaire';
import { EditMobiliteComponent } from './edit-mobilite/edit-mobilite.component';
 
@Component({
  selector: 'app-gestion-des-mobilites',
  templateUrl: './gestion-des-mobilites.component.html',
  styleUrls: ['./gestion-des-mobilites.component.css']
})
export class GestionDesMobilitesComponent implements OnInit {
  ExcelData: any;
  etudiants?: Etudiant[];
  selectedValue!: string;
  selectedYearValue!: string;
  selectedFile!: File;
  file!: File;
  promotions: any[]=[];
  years: any[]=[];
  annees:annee_universitaire[]=[];
  promo?:any;
  champs:boolean=true;
  annee?:any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['numero' , 'nom', 'prenom','Type','Duree','description','actions' ];//"Type","Duree","Statuts",
  dataSource!: MatTableDataSource<Etudiant>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  form!:FormGroup;
  promotions_Annee : Promotion[]=[];
  constructor(private HttpClient: HttpClient,private dialog: MatDialog,
     private us: UtilisateurService, private etuService: EtudiantService,private promService:PromotionService, 
     private toastr:ToastrService,
    private fb:FormBuilder) { }


     initForm(): void {
      this.form = this.fb.group({
      selectedPromotion:new FormControl('' ,[Validators.required]),
      selectedType:new FormControl('' ,[Validators.required]),
     
      anneeSel:new FormControl('' ,[]),
      searchKey:new FormControl('' ,[]),


      
    })}
  
    get f (){ return this.form.controls }

  ngOnInit(): void {
   this.getPromotions();
   this.ListerEtudiants()
   this.initForm();
   this.getAnnees();
  }


  getAnnees(){
    this.promService.getannees().subscribe(
      data=>{
        this.annees=data;      }
    , err => { console.log(err); });
  }

  
  /**
   * 
   * @param event 
   */
  onFileChanged(event: any) {
    this.selectedFile = event.target.files[0];
    
    // Récupération du fichier Excel
    this.file = event.target.files[0];
    const fd = new FormData();
    fd.append('file', this.file);
    // Envoi de la requête POST
    fd.append('promo',this.f.selectedPromotion.value);
    fd.append('annee',this.f.anneeU.value);
    fd.append('type',this.f.selectedType.value);

    this.etuService.importEtudiants(fd).subscribe(data => {
    this.toastr.success('Importation avec Succées', 'La liste des Etudiant est bien importée'); 
    }, err => {     this.toastr.error("Une erreur s'est produite","Importation imopssible");
    console.log(err); });
    
  }

  /**
   * Lister tous les etudiants sans filtre
   */
  ListerEtudiants():void{
    this.etuService.Alletudiant().subscribe(etuds => {
      this.etudiants = etuds;
      this.dataSource = new MatTableDataSource(this.etudiants);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
    
  }

 applyFilter(){this.dataSource.filter = this.f.searchKey.value.trim().toLocaleLowerCase(); }
 
  ChargerPromotions(){
    this.promService.getpromotionsByAnnee(this.f.anneeSel.value).subscribe(
      data=>{
        this.promotions_Annee=data;
      }); 
  }
  

  /**
   * Retourner les promotions
   */
  getPromotions(){
    
    this.promService.getpromotions().subscribe(
      data => {this.promotions=data;
      }, err => { console.log(err); });
  }


  ListerEtudiantFiltrer(){

  console.log("promo est"+this.f.selectedPromotion.value)
  console.log("Anne est "+this.f.anneeSel.value)
  console.log(this.f.selectedType.value);
      this.etuService.listeEtudiant(this.f.selectedPromotion.value,this.f.anneeSel.value).subscribe(etuds => {
        console.log(etuds);
        this.etudiants = etuds;
        this.dataSource = new MatTableDataSource(this.etudiants);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    
    
  }



  /**
   * 
   * @param etudiant : represente l'etudiant quand va supprimer
   */

edit(etudiant:any) 
{
  
  const DialogConfig = new MatDialogConfig();
    DialogConfig.autoFocus=true;
    const dialogRef= this.dialog.open(EditMobiliteComponent,
      {
        width:'25%',
        height:'89%',
        panelClass:'custom-dialog',
      data:{etudiant}    })
    dialogRef.afterClosed().subscribe(res=>
      {      //this.ListerEtudiants("Annee4","2021/2022") 
      })
}

  

onSubmit() {console.warn(this.form.value);}

  


}
