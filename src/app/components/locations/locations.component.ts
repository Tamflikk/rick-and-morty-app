import { Component, OnInit } from '@angular/core';
import { RickMortyService, Location, ApiResponse } from '../../services/rick-morty.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
})
export class LocationsComponent implements OnInit {
  locations: Location[] = [];
  loading = true;
  error = false;
  currentPage = 1;
  totalPages = 0;

  constructor(private rickMortyService: RickMortyService) { }

  ngOnInit(): void {
    this.loadLocations();
  }

  loadLocations(): void {
    this.loading = true;
    this.error = false;
    
    this.rickMortyService.getLocations(this.currentPage).subscribe({
      next: (response) => {
        this.handleResponse(response);
      },
      error: (err) => {
        console.error('Error loading locations:', err);
        this.error = true;
        this.loading = false;
      }
    });
  }

  handleResponse(response: ApiResponse<Location>): void {
    this.locations = response.results;
    this.totalPages = response.info.pages;
    this.loading = false;
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadLocations();
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.loadLocations();
    }
  }
}