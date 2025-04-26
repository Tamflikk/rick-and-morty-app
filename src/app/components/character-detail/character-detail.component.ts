import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Character, RickMortyService, Episode } from '../../services/rick-morty.service';
import { forkJoin, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-character-detail',
  templateUrl: './character-detail.component.html',
})
export class CharacterDetailComponent implements OnInit {
  character!: Character;
  episodes: Episode[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private rickMortyService: RickMortyService
  ) { }

  ngOnInit(): void {
    this.character = this.route.snapshot.data['character'];
    
    if (this.character && this.character.episode) {
      this.loadEpisodes();
    }
  }

  loadEpisodes(): void {
    this.loading = true;
    
    const episodeIds = this.character.episode.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
    
    const episodesToLoad = episodeIds.slice(0, 5);
    const episodeObservables: Observable<Episode>[] = episodesToLoad.map(id => 
      this.rickMortyService.getEpisode(Number(id))
    );
    
    forkJoin(episodeObservables).subscribe({
      next: (episodes) => {
        this.episodes = episodes;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading episodes:', err);
        this.loading = false;
      }
    });
  }
}