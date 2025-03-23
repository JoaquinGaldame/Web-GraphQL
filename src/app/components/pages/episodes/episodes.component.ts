import { Component, inject, OnInit } from '@angular/core';
import { Episode } from '@app/shared/interfaces/data.interfaces';
import { DataService } from '@app/shared/services/data/data.service';
import { Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-episodes',
  imports: [AsyncPipe,NgFor],
  template:`
  <section class="container episode-card">
    <ul class="episodes__list">
      <li *ngFor="let episode of episodes$ | async">
        {{episode.episode}} - {{episode.name}}
      </li>
    </ul>
  </section>
  `,
  styleUrl: './episodes.component.css'
})
export class EpisodesComponent implements OnInit{
  episodes$: Observable<Episode[]>; 

  constructor(private dataService: DataService){
    this.episodes$ = this.dataService.episodes$;
  }
  
  
  ngOnInit(): void {
  }
}
