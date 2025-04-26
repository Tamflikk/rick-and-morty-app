import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RickMortyService, Location } from '../services/rick-morty.service';

@Injectable({
  providedIn: 'root'
})
export class LocationDetailResolver implements Resolve<Location> {
  constructor(private rickMortyService: RickMortyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Location> {
    const id = Number(route.paramMap.get('id'));
    return this.rickMortyService.getLocation(id).pipe(
      catchError(error => {
        console.error('Error fetching location:', error);
        return of({} as Location);
      })
    );
  }
}