import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location, RickMortyService, Character } from '../../services/rick-morty.service';
import { forkJoin, Observable } from 'rxjs';

@Component({
  selector: 'app-location-detail',
  templateUrl: './location-detail.component.html',
})
export class LocationDetailComponent implements OnInit {
  location!: Location;
  residents: Character[] = [];
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private rickMortyService: RickMortyService
  ) { }

  ngOnInit(): void {
    this.location = this.route.snapshot.data['location'];
    
    if (this.location && this.location.residents && this.location.residents.length > 0) {
      this.loadResidents();
    }
  }

  loadResidents(): void {
    this.loading = true;
    
    const residentIds = this.location.residents.map(url => {
      const parts = url.split('/');
      return parts[parts.length - 1];
    });
    
    const residentsToLoad = residentIds.slice(0, 10);
    const residentObservables: Observable<Character>[] = residentsToLoad.map(id => 
      this.rickMortyService.getCharacter(Number(id))
    );
    
    if (residentObservables.length > 0) {
      forkJoin(residentObservables).subscribe({
        next: (residents) => {
          this.residents = residents;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error loading residents:', err);
          this.loading = false;
        }
      });
    } else {
      this.loading = false;
    }
  }
}