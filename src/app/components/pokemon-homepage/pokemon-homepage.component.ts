import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import {TYPE_COLOURS, Results, PokemonAPI, PokemonDetalles} from 'src/interfaces';
import {PokemonService} from 'src/services/pokemon.service';


@Component({
  selector: 'app-pokemon-homepage',
  templateUrl: './pokemon-homepage.component.html',
  styleUrls: ['./pokemon-homepage.component.scss']
  
})
export class PokemonHomepageComponent implements OnInit {
  @Output() exportaPokomones = new EventEmitter();
  pokemonesCargados : boolean;
  pokemonesApi : PokemonAPI;
  consulta: string;
  filtroDeHabilidades: Array<string>;
  tipoDeFiltros: string;

  @Input() set search(newSearch: string) {
    if (newSearch !== this.consulta) {
      this.consulta = newSearch;
    }
  }

  @Input() set typeFilter(type: string) {
    if (type !== this.typeFilter) {
      this.tipoDeFiltros = type;
    }
  }

  @Input() set abilityFilter(abilities: Array<string>) {
    if (abilities !== this.filtroDeHabilidades) {
      this.filtroDeHabilidades = abilities;
    }
  }
  
  /* 1. en el constructor instancio al servicio */
  constructor(private pokemonServicio:PokemonService) { }

  /* 2. el ngonInit es como el load y es un event tipo void
   Aca llamo al método que carga todos los pokemones  */
  ngOnInit(): void {
    this.pokemonesCargados = false;
    this.obtenerPokemmones();
  }

  /* 3. crear el método que cargue todos los pokemones
    Aca me suscribo a la funcion observable  */

obtenerPokemmones(): void {
  this.pokemonServicio.getPokemon().subscribe((data: PokemonAPI) => {
    this.pokemonesApi = data;

console.log('largo : '+ data);

    if (this.pokemonesApi.results && this.pokemonesApi.results.length) {
      // get pokemon details for every pokemon
      this.pokemonesApi.results.forEach(pokemon => {
        // set pokemon id
        pokemon.id = pokemon.url.split('/')[
          pokemon.url.split('/').length - 2
        ];

        this.obtenerPokemonDetalles(pokemon);
        this.obtenerPokemonEspeciesDetalles(pokemon);
      });
    }
  });
}
  
  /* 4. método que trae los detalles de un pokemon */
  obtenerPokemonDetalles(itemPoke: Results): void {
    this.pokemonServicio.getPokemonDetail(itemPoke.name).subscribe((detalles: PokemonDetalles) => {
      itemPoke.details = detalles;
      if(itemPoke.id === '10'){
          this.pokemonesCargados = true;
          this.exportaPokomones.emit(this.pokemonesApi.results);
      }   
    });
   
  }

  /* 5.  */
  obtenerPokemonEspeciesDetalles_(itemPoke: Results):void {
    this.pokemonServicio.getPokemonSpecies(itemPoke.name)
    .subscribe((species:any)=>{
      const entries = species.flavor_text_entries;
      if(entries){
          entries.some(flavor=>{
            if(flavor.languaje.name === 'en'){
                itemPoke.description = flavor.flavor_text;
            }
          });
      }
    });
  }

  obtenerPokemonEspeciesDetalles(pokemon: Results): void {
    this.pokemonServicio
      .getPokemonSpecies(pokemon.name)
      .subscribe((species: any) => {
        const entries = species.flavor_text_entries;
        if (entries) {
          entries.some(flavor => {
            if (flavor.language.name === 'en') {
              pokemon.description = flavor.flavor_text;
            }
          });
        }
      });
  }
  /* 6.  */
  _getTypeColour(type: string): string {
    if (type) {
      return '#' + TYPE_COLOURS[type];
    }
  }
}

