import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RickMortyService, Episode } from '../services/rick-morty.service';

@Injectable({
  providedIn: 'root'
})
export class EpisodeDetailResolver implements Resolve<Episode> {
  constructor(private rickMortyService: RickMortyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Episode> {
    const id = Number(route.paramMap.get('id'));
    return this.rickMortyService.getEpisode(id).pipe(
      catchError(error => {
        console.error('Error fetching episode:', error);
        return of({} as Episode);
      })
    );
  }
}