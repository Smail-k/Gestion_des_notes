import { Component, Inject, OnInit } from '@angular/core';
import { ThisReceiver } from '@angular/compiler';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/models/etudiant';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { mobilite } from 'src/app/models/mobilite';

@Component({
  selector: 'app-edit-mobilite',
  templateUrl: './edit-mobilite.component.html',
  styleUrls: ['./edit-mobilite.component.css']
})
export class EditMobiliteComponent implements OnInit {

  constructor(private fb: FormBuilder,private es:EtudiantService ,private toastr:ToastrService,@Inject(MAT_DIALOG_DATA) public data:any) { }
  
  form! :FormGroup;
  numero! : string;
  x!:number;
  Duree?:number;


  ngOnInit(): void {
    this.initForm();
    this.ongetNumero();
  }

  initForm(): void {
    this.form = this.fb.group({
      Duree:new FormControl('' ,[Validators.required,  Validators.pattern('^[a-zA-Z_]+'),Validators.minLength(3)]),
    Type: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required),
    



  })}

  onAdd():void{
   // this.es.addEtudiant().subscribe
   let etudiant:Etudiant={};
   etudiant.numero = this.numero; 
   etudiant.nom = this.f.nom.value;
   etudiant.prenom = this.f.prenom.value;
   
   etudiant.annee="2021/2022"
   this.es.addEtudiant(etudiant).subscribe(
    data=> {
    } , err => { console.log(err);
    }
   )

   this.toastr.success('Ajouter etudiant',"  succés"); 


  }
 
  onEdite():void{
    // this.es.addEtudiant().subscribe
    
    let etudiant:Etudiant={};
    etudiant.mobilite = {}; 
    etudiant.mobilite.type=this.f.Type.value; 
     
    etudiant.mobilite.duree = this.f.Duree.value;
    etudiant.mobilite.description = this.f.description.value;
    console.log(this.data.etudiant.numero);
    
    this.es.editeEtudiant(etudiant.mobilite,this.data.etudiant.numero).subscribe(
     data=> {
     } , err => { console.log(err);
     }
    )
 
    this.toastr.success('etudiant Bien modifier',"  succés"); 
 
 
   }
 
  ongetNumero(){
    this.es.GetEtudiantMaxNumero().subscribe(
      data => {
        this.numero =data;
      } ,  err => { console.log(err); });
  }

  

get f (){ return this.form.controls }
onSubmit() {console.warn(this.form.value);}
}
