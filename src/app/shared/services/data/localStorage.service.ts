import { Injectable } from "@angular/core";
import { Character } from "@app/shared/interfaces/data.interfaces";
import { BehaviorSubject } from "rxjs";
const FAVOURITES = 'Favourites';
@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  private charactersFavouritesSubject = new BehaviorSubject<Character[]>([]);
  charactersFavourites$ = this.charactersFavouritesSubject.asObservable();

  constructor(){
    this.initialStorage();
  }

  // No va con SOLID pero evita código repetitivo
  addOrRemoveFavourite(character: Character):void{
    const {id} = character;
    console.log('esto recibe ' + JSON.stringify(character))
    console.log('este ID  ' + id)
    const currentsFav = this.getFavouritesCharacters();
    console.log('esto tiene LOCAL ANTES ' + JSON.stringify(currentsFav))
    const found = !!currentsFav.find((fav: Character) => fav.id == id);
    console.log('RESULTADO ' + found)
    found ? this.removeFromFavourite(id) : this.addToFavourite(character)
  }

  private addToFavourite(character: Character):void{
    try{
      console.log('SUMAA')
      const currentsFav = this.getFavouritesCharacters();
      console.log('esto agrega ' + JSON.stringify(currentsFav))
      localStorage.setItem(FAVOURITES, JSON.stringify([...currentsFav,character]))
      this.charactersFavouritesSubject.next([...currentsFav,character]);
    } catch(error){
      console.error('Error saving in localStorage ', error);
    }
  }

  private removeFromFavourite(id: number ): void{
    try{
      const currentsFav = this.getFavouritesCharacters();
      console.log('esto recibe ' + id)
      const characters = currentsFav.filter((item: Character) => item.id !== id)
      console.log('esto filtro ' + JSON.stringify(characters))
      localStorage.setItem(FAVOURITES, JSON.stringify([...characters]))
      console.log('esto agrego ' + JSON.stringify([...characters]))
      this.charactersFavouritesSubject.next([...characters]);
    } catch(error){
      console.error('Error removing in localStorage ', error);
    }
  }

  getFavouritesCharacters(): any{
    try{
      const charactersFavourites = JSON.parse(localStorage.getItem(FAVOURITES)|| '[]')
      this.charactersFavouritesSubject.next(charactersFavourites);
      return charactersFavourites;
    } catch(error){
      console.error('Error getting favourites from localStorage ', error)
    }
  }

  clearStorage(): void{
    try{
      localStorage.clear();
    } catch(error){
      console.error('Error cleaning localStorage ', error);
    }
  }

  private initialStorage():void{
    const currents = JSON.parse(localStorage.getItem(FAVOURITES) || '[]')
    if(!currents){
      localStorage.setItem(FAVOURITES, JSON.stringify([]))
    }
    this.getFavouritesCharacters();
  }
}