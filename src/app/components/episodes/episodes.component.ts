// episodes.component.ts
import { Component, OnInit } from '@angular/core';
import { RickMortyService, Episode, ApiResponse } from '../../services/rick-morty.service';

@Component({
  selector: 'app-episodes',
  templateUrl: './episodes.component.html',
})
export class EpisodesComponent implements OnInit {
  episodes: Episode[] = [];
  loading = true;
  error = false;
  currentPage = 1;
  totalPages = 0;

  constructor(private rickMortyService: RickMortyService) { }

  ngOnInit(): void {
    this.loadEpisodes();
  }

  loadEpisodes(): void {
    this.loading = true;
    this.error = false;
    
    this.rickMortyService.getEpisodes(this.currentPage).subscribe({
      next: (response) => {
        this.handleResponse(response);
      },
      error: (err) => {
        console.error('Error loading episodes:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  handleResponse(response: ApiResponse<Episode>): void {
    this.episodes = response.results;
    this.totalPages = response.info.pages;
    this.loading = false;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadEpisodes();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadEpisodes();
    }
  }
}