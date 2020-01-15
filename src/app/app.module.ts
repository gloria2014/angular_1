import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PokemonHomepageComponent } from './components/pokemon-homepage/pokemon-homepage.component';
import { PokemonHeaderComponent } from './components/pokemon-header/pokemon-header.component';

import {MaterialModule} from '../modules/material/material.module';
// --------------
import { HttpClientModule } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AbilitiesFilterPipe } from './pipes/abilities-filter.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { TypeFilterPipe } from './pipes/type-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    PokemonHomepageComponent,
    PokemonHeaderComponent,
    AbilitiesFilterPipe,
    SearchPipe,
    TypeFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
