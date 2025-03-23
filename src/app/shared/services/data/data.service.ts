import { Injectable, Query } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { BehaviorSubject, take, tap } from 'rxjs';
import { GetDataQUERY } from './graphql.queries';
import { Character, DataResponse, Episode } from '@app/shared/interfaces/data.interfaces';
import { LocalStorageService } from './localStorage.service';


@Injectable({
  providedIn: 'root'
})
export class DataService {
  // Observables
  private episodesSubject = new BehaviorSubject<Episode[]>([]);
  episodes$ = this.episodesSubject.asObservable();

  private charactersSubject = new BehaviorSubject<Character[]>([]);
  characters$ = this.charactersSubject.asObservable();

  constructor(private apollo: Apollo, private localStorage: LocalStorageService) {
    this.getDataAPI();
   }

   // Query to API - Characters and Episodes
   getDataAPI():void{
    this.apollo.watchQuery<DataResponse>({
      query: GetDataQUERY
    }).valueChanges.pipe(
      take(1),
      tap( ({data}) => {
        const { characters, episodes } = data;
        //this.charactersSubject.next(characters.results);
        this.episodesSubject.next(episodes.results);
        this.parseCharacterData(characters.results)
      })
    ).subscribe()
  }

  private parseCharacterData(characters: Character[]): void{
    const currentsFavs = this.localStorage.getFavouritesCharacters();
    const newData = characters.map(character => {
      const found = currentsFavs.filter((item: Character) => item.id === character.id).length > 0;
      return {...character, isFavourite: found};
    });
    this.charactersSubject.next(newData);
  }
}
