import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Ability, AbilityName} from "../ability";
import {HeroService} from "../hero.service";
import {Hero} from "../hero";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-add-window',
  templateUrl: './add-window.component.html',
  styleUrls: ['./add-window.component.scss']
})
export class AddWindowComponent {
    @Input() hero!: Hero;
    @Output() add = new EventEmitter<number>();

    heroAbilities: Ability[] = [];
    heroAbNames: string[]= [];
    fullAbList: string[] = [];
    heroName: string = "";

    constructor(
        private route: ActivatedRoute,
        private heroService: HeroService,
        private location: Location
    ) {}

    ngOnInit(): void {
        this.getHero();
        this.fullAbList = Object.keys(AbilityName)
    }

    addAbility(): void {
        if (this.heroAbilities.length < Object.keys(AbilityName).length)
            this.heroAbilities.push({name: "Strength", power: 5});
    }

    getHero(): void {
        const id = Number(this.route.snapshot.paramMap.get('id'));
        this.heroService.getHero(id)
            .subscribe(hero => this.hero = hero);
    }

    trackByIndex(index: number): number {return index;}

    removeAbility(index: number): void {
        if (this.heroAbilities.length > 1)
            this.heroAbilities.splice(index, 1);
    }

    addHero() {
        this.heroService.addHero(this.heroName, this.heroAbilities).subscribe(id => {
            this.add.emit(id);
        });
    }
}
