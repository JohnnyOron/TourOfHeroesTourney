import {Component, Input} from '@angular/core';
import {NgIf, UpperCasePipe, NgForOf} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Hero} from '../hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import {Ability, AbilityName} from '../ability'

import { HeroService } from '../hero.service';

@Component({
  standalone: true,
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss'],
  imports: [FormsModule, NgIf, UpperCasePipe, NgForOf],
})
export class HeroDetailComponent {
  @Input() hero?: Hero;

  heroAbilities: Ability[] = [];
  heroAbNames: string[]= [];
  heroPow: number[] = [];
  fullAbList: string[] = [];

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getHero();
    this.heroAbilities = this.hero!.ability;
    this.heroAbNames = this.heroAbilities.map(ability => ability.name);
    this.heroPow = this.heroAbilities.map(ability => ability.power)
    this.fullAbList = Object.keys(AbilityName)
  }

  getHero(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  addAbility(): void {
    if (this.heroAbilities.length < Object.keys(AbilityName).length)
      this.heroAbilities.push({name: "Strength", power: 5});
  }

  trackByIndex(index: number): number {
    return index;
  }

  removeAbility(index: number): void {
    if (this.heroAbilities.length > 1)
      this.heroAbilities.splice(index, 1);
  }

  isNotInHeroAbNames(ability: string): boolean {
    return !this.heroAbNames.includes(ability);
  }


  protected readonly name = name;
}
