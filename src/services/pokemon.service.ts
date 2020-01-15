import { Injectable } from '@angular/core';
/* Importo librerias de angular */
import {HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from 'rxjs/operators';

/* Importo los archivos de  envoriment y la interfáz */
import {environment} from 'src/environments/environment'; // o ../environments/environment
import {PokemonAPI, PokemonDetalles } from 'src/interfaces';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
/* 1. creo 2 variables */
pokeAPIVariable: any;
pokeEspeciesAPIVariable: any;

/* 2. Inicializo las variables de la constante environment */
  constructor(private httpPAram : HttpClient) {
    this.pokeAPIVariable = environment.pokemonURL;
    this.pokeEspeciesAPIVariable = environment.pokemonSpeciesURL;
   }

  /* 3. Método para manejar errores */
  private _handleError(errorParam: HttpErrorResponse){
    if(errorParam.error instanceof ErrorEvent){
      console.error('HA ocurrido un error del lado del cliente o de red', errorParam.error.message);
    }else{
      console.log(
          /* ``` =  teclado altgr + teclado de llave de cierre */
          `BAckend retornó código  ${errorParam.status}, ` + ` body was : ${errorParam.error} `
      ); 
     }
    return throwError('Something bad happened, please try later');
  }

  /* 4. Función observable getPokemon que 
  Retorno todos los pokemones ( 10 ) */
  getPokemon(): Observable<PokemonAPI>{
    return this.httpPAram
    .get<PokemonAPI>(`${this.pokeAPIVariable}?limit=10`)
    .pipe(catchError(this._handleError));
  }

  /* 5. Retorno el detalle para un pokemon Le paso como parámetro el nombre */
  getPokemonDetail(nombreParam): Observable<PokemonDetalles>{
    return this.httpPAram
    .get<PokemonDetalles>(`${this.pokeAPIVariable}/${nombreParam}`)
    .pipe(catchError(this._handleError));
  }

  /* 6. retorno las especies de un pokemon Como parametro le envio el nombre */
  getPokemonSpecies(nombreParam):Observable<any> {
      return this.httpPAram
      .get<any>(`${this.pokeEspeciesAPIVariable}/${nombreParam}`)
      .pipe(catchError(this._handleError));
  }
}