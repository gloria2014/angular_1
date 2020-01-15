import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(value: any, searchText?: any): any { 
    if (!value) {
      return;
    }
    if (!searchText) {
      return value; //si no se ha buscado nada mantenga el value de alguna buscada pasada
    }
    searchText = searchText.toLowerCase(); //el texto será inicializado en minuscula

    return value.filter(item => { //le aplico por medio de filter, ciertas condiciones al value que el item será encargado de manipular 
      let matchFound = false; //deshabilitado mientras no busque
      //si viene nombre y url
      if (item.name && item.url) {
        const name = item.name; //guardo su nombre del item de la busqueda
        const index = item.url.split('/')[item.url.split('/').length - 2]; //y el id
        //guardo el name y el index y lo transformo en una cadena de json, donde a esos valores les incluyo el texto buscado por el usuario
        const searchName = JSON.stringify(name).toLowerCase().includes(searchText);
        const searchId = JSON.stringify(index).toLowerCase().includes(searchText);
        //si busco por nombre o id
        if (searchName || searchId) {
          matchFound = true; //habilito la variable de match
        }
      }
      return matchFound; //retorno su valor
    });
  }

}
