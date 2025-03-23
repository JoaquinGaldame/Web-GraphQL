import { Component, OnInit } from '@angular/core';
import { Character } from '@app/shared/interfaces/data.interfaces';
import { LocalStorageService } from '@app/shared/services/data/localStorage.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { CharactersCardComponent } from "../characters/characters-card/characters-card.component";

@Component({
  selector: 'app-home',
  imports: [AsyncPipe, CharactersCardComponent,NgFor],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit{
  charactersFav$: Observable<Character[]>;

  constructor(private localStorage: LocalStorageService){
    this.charactersFav$= this.localStorage.charactersFavourites$
  }
  ngOnInit(): void {
    
  }
}
