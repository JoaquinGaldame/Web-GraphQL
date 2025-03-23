import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Character } from '@app/shared/interfaces/data.interfaces';
import { LocalStorageService } from '@app/shared/services/data/localStorage.service';

@Component({
  selector: 'app-characters-card',
  imports: [RouterModule],
  templateUrl: './characters-card.component.html',
  styleUrl: './characters-card.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CharactersCardComponent {
  @Input() character!: Character;
  constructor(private localStorage: LocalStorageService){}
  getIcon():string{
    return this.character.isFavourite ? 'heart-solid.svg': 'heart.svg'; 
  }
  
  toggleFavourite():void{
    const isFavourite = this.character.isFavourite;
    this.getIcon();
    this.character.isFavourite = !isFavourite;
    this.localStorage.addOrRemoveFavourite(this.character)
  }
}
