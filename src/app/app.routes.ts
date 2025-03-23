import { Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { EpisodesComponent } from './components/pages/episodes/episodes.component';
import { NotFoundComponent } from './components/pages/notFound/not-found.component';
import { CharactersListComponent } from './components/pages/characters/characters-list/characters-list.component';
import { CharactersDetailsComponent } from './components/pages/characters/characters-details/characters-details.component';
import { AboutComponent } from './components/pages/about/about.component';

export const routes: Routes = [
    { path: '', redirectTo: 'characters-list', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'episodes', component: EpisodesComponent },
    { path: 'characters-list', component: CharactersListComponent },
    { path: 'characters-details/:id', component: CharactersDetailsComponent },
    { path: 'about', component: AboutComponent },
    { path: '**', component: NotFoundComponent },
];

