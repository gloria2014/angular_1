import { Component } from '@angular/core';
import {Results} from '../interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public search: string;
  public typeFilter: string;
  public pokemonResultado: Array<Results>; //aquí ya tengo los valores de la interfaz
  public abilityFilter: Array<string>;

  exportPokemons(pokemons: Array<Results>): void {
    if (this.pokemonResultado !== pokemons) {
      this.pokemonResultado = pokemons;
    }
  }

  newPokemonSearch(buscando: string): void{
      if(this.search !== buscando){
            this.search = buscando;
      }
  }

  newTypeSelected(filter: string): void {
    if (this.typeFilter !== filter) {
      this.typeFilter = filter;
    }
  }

  /**
   * Called when header ability selection changes
   */
  newAbilitiesSelected(abilities: Array<string>): void {
    if (this.abilityFilter !== abilities) {
      this.abilityFilter = abilities;
    }
  }

}
