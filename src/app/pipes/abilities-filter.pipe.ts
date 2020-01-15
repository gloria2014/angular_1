import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'abilitiesFilter'
})
export class AbilitiesFilterPipe implements PipeTransform {

  transform(value: any, filters?: any): any {
    if (!value) {
      return;
    }
    if (!filters) {
      return value; //si no se ha buscado nada mantenga el value de alguna buscada pasada
    }

    return value.filter(item => {
      let matchFound = true; //dejo habilitado el match de coincidencia

      if (item.details && item.details.abilities) {
        //si vienen filtros
        filters.forEach(filter => { //itero todos mis filtros
          if (matchFound) {
            //las dejo como una cadena de json
            matchFound = JSON.stringify(item.details.abilities)
            .toLowerCase() //las dejo en minisculas
            .includes(filter); //voy incluyendo cada nuevo filtro de habilidad seleccionada
            }
          });
      }
      return matchFound; //retorno el match de coincidencia con los valores de la cadena del json
    });
  }

}
