import { Component } from '@angular/core';
import { DataService } from '@app/shared/services/data/data.service';
import { LocalStorageService } from '@app/shared/services/data/localStorage.service';
import { AsyncPipe, NgFor } from '@angular/common';
import { Observable } from 'rxjs';
import { Character } from '@app/shared/interfaces/data.interfaces';
import { CharactersCardComponent } from "../characters-card/characters-card.component";

@Component({
  selector: 'app-characters-list',
  imports: [CharactersCardComponent,AsyncPipe,NgFor],
  template: `
  <section class="character__list">
    <app-characters-card *ngFor="let character of characters$ | async" [character]="character"></app-characters-card>
  </section>`,
  styleUrl: './characters-list.component.css'
})
export class CharactersListComponent {
  characters$: Observable<Character[]>
  constructor(
    private _dataService: DataService,
    private _localStorage: LocalStorageService
  ){
    this.characters$ = this._dataService.characters$;
  }
}
