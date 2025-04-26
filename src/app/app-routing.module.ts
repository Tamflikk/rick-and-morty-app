import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CharactersComponent } from './components/characters/characters.component';
import { CharacterDetailComponent } from './components/character-detail/character-detail.component';
import { LocationsComponent } from './components/locations/locations.component';
import { LocationDetailComponent } from './components/location-detail/location-detail.component';
import { EpisodesComponent } from './components/episodes/episodes.component';
import { EpisodeDetailComponent } from './components/episode-detail/episode-detail.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

import { CharacterDetailResolver } from './resolvers/character-detail.resolver';
import { LocationDetailResolver } from './resolvers/location-detail.resolver';
import { EpisodeDetailResolver } from './resolvers/episode-detail.resolver';

const routes: Routes = [
  { path: '', component: CharactersComponent },
  { path: 'characters', component: CharactersComponent },
  { 
    path: 'character/:id', 
    component: CharacterDetailComponent,
    resolve: {
      character: CharacterDetailResolver
    }
  },
  { path: 'locations', component: LocationsComponent },
  { 
    path: 'location/:id', 
    component: LocationDetailComponent,
    resolve: {
      location: LocationDetailResolver
    }
  },
  { path: 'episodes', component: EpisodesComponent },
  { 
    path: 'episode/:id', 
    component: EpisodeDetailComponent,
    resolve: {
      episode: EpisodeDetailResolver
    }
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }