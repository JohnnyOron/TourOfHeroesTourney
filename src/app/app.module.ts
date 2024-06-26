import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddWindowComponent } from './add-window/add-window.component';
import { AbilitiesComponent } from './abilities/abilities.component';

@NgModule({
  declarations: [
    AppComponent,
    HeroesComponent,
    MessagesComponent,
    DashboardComponent,
    AddWindowComponent,
    AbilitiesComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HeroDetailComponent,
    AppRoutingModule
  ],
  providers: [
    // no need to place any providers due to the `providedIn` flag...
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
