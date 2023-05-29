import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { EtudiantService } from 'src/app/services/etudiant.service';
import { NoteService } from 'src/app/services/note.service';
import { PromotionService } from 'src/app/services/promotion.service';

export interface NoteMatiereElement {
  nom: string;
  prenom: string;
  matiere:string;
  moyenne:number;
}

@Component({
  selector: 'app-notematiere',
  templateUrl: './notematiere.component.html',
  styleUrls: ['./notematiere.component.css']
})
export class NotematiereComponent implements OnInit {

  etudiantsOb?: Object[];
  searchKey!: any;
  listData! : MatTableDataSource<any>;
  displayedColumns : string[] = ['nom', 'prenom','matiere', 'note'];
  dataSource!: MatTableDataSource<Object>;
  @ViewChild(MatSort) sort! : MatSort;
  @ViewChild (MatPaginator) paginator! : MatPaginator;
  
  constructor(private ps: PromotionService,private es:EtudiantService,private notesr:NoteService, private route: ActivatedRoute) { }


  ngOnInit(): void {

    const codeUnite = this.route.snapshot.paramMap.get('code');
    const numero = this.route.snapshot.paramMap.get('numero');
    const annee = this.route.snapshot.paramMap.get('annee');
    this.ListerEtudiants(codeUnite, numero, annee);
  }

  ListerEtudiants(codeUnite:any,numero:any, annee:any):void{
    
    this.notesr.listeNotesMatiere(codeUnite,numero, annee).subscribe(etuds => {
      this.etudiantsOb = etuds;
      console.log(etuds);

      this.etudiantsOb = etuds.map(([nom, prenom, matiere, moyenne]): NoteMatiereElement => ({
        nom,
        prenom,
        matiere,
        moyenne,
      }) );

      this.dataSource = new MatTableDataSource(this.etudiantsOb);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter() { 
    this.dataSource.filter = this.searchKey.trim().toLocaleLowerCase(); 
  }

  onSearchClear() {
    this.searchKey = "";
    this.applyFilter();
  }
  
}
