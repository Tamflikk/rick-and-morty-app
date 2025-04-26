// episode-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Episode, RickMortyService, Character } from '../../services/rick-morty.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-episode-detail',
  templateUrl: './episode-detail.component.html',
})
export class EpisodeDetailComponent implements OnInit {
  episode!: Episode;
  characters: Character[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private rickMortyService: RickMortyService
  ) { }

  ngOnInit(): void {
    // Get episode from resolver
    this.episode = this.route.snapshot.data['episode'];
    
    if (this.episode && this.episode.characters && this.episode.characters.length > 0) {
      this.loadCharacters();
    }
  }

  loadCharacters(): void {
    this.loading = true;
    
    // Extract character IDs from URLs
    const characterIds = this.episode.characters.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
    
    // Load first 10 characters
    const charactersToLoad = characterIds.slice(0, 10);
    const characterObservables: Observable<Character>[] = charactersToLoad.map(id => 
      this.rickMortyService.getCharacter(Number(id))
    );
    
    forkJoin(characterObservables).subscribe({
      next: (characters) => {
        this.characters = characters;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading characters:', err);
        this.loading = false;
      }
    });
  }
}