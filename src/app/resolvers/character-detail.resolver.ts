import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RickMortyService, Character } from '../services/rick-morty.service';

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailResolver implements Resolve<Character> {
  constructor(private rickMortyService: RickMortyService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Character> {
    const id = Number(route.paramMap.get('id'));
    return this.rickMortyService.getCharacter(id).pipe(
      catchError(error => {
        console.error('Error fetching character:', error);
        return of({} as Character);
      })
    );
  }
}