import { Injectable } from '@angular/core';

import {Observable, of, forkJoin, map} from 'rxjs';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { MessageService } from './message.service';
import {Ability} from "./ability";

@Injectable({
  providedIn: 'root',
})
export class HeroService {

  constructor(private messageService: MessageService) { }

  getHeroes(): Observable<Hero[]> {
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number): Observable<Hero> {
    const hero = HEROES.find(h => h.id === id)!;
    this.messageService.add(`HeroService: fetched hero id=${id}`);
    return of(hero);
  }

  addHero(name: string, abilities: Ability[]): Observable<number> {
    const fork = forkJoin([
      this.getHeroes(),
      of(HEROES.map(h => h.id)).pipe(map(ids => Math.max(...ids)))
    ]);

    return fork.pipe(
        map(([heroes, maxId]) => {
          const newHero: Hero = { id: maxId + 1, name, abilities, Score: 0};
          HEROES.push(newHero);
          return newHero.id;
        })
    );
  }
}
