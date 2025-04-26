import { Component, OnInit } from '@angular/core';
import { RickMortyService, Character, ApiResponse } from '../../services/rick-morty.service';

@Component({
  selector: 'app-characters',
  templateUrl: './characters.component.html',
})
export class CharactersComponent implements OnInit {
  characters: Character[] = [];
  loading = true;
  error = false;
  currentPage = 1;
  totalPages = 0;
  searchTerm = '';

  constructor(private rickMortyService: RickMortyService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.loading = true;
    this.error = false;
    
    if (this.searchTerm) {
      this.searchCharacters();
    } else {
      this.rickMortyService.getCharacters(this.currentPage).subscribe({
        next: (response) => {
          this.handleResponse(response);
        },
        error: (err) => {
          console.error('Error loading characters:', err);
          this.error = true;
          this.loading = false;
        }
      });
    }
  }

  searchCharacters(): void {
    this.loading = true;
    this.error = false;
    
    this.rickMortyService.searchCharacters(this.searchTerm, this.currentPage).subscribe({
      next: (response) => {
        this.handleResponse(response);
      },
      error: (err) => {
        console.error('Error searching characters:', err);
        this.error = true;
        this.loading = false;
        if (err.status === 404) {
          this.characters = [];
          this.totalPages = 0;
        }
      }
    });
  }

  handleResponse(response: ApiResponse<Character>): void {
    this.characters = response.results;
    this.totalPages = response.info.pages;
    this.loading = false;
  }

  onSearch(): void {
    this.currentPage = 1;
    this.loadCharacters();
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadCharacters();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadCharacters();
    }
  }
}