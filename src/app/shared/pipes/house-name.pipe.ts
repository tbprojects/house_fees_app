import { Pipe, PipeTransform } from '@angular/core';
import { House } from 'core/types/house';

@Pipe({
  name: 'houseName'
})
export class HouseNamePipe implements PipeTransform {
  transform(house: House | null): unknown {
    if (!house) {
      return '';
    } else if (house.name) {
      return house.name
    } else if (house.uuid) {
      return $localize `House` + ' ' + house.uuid.split('-')[0];
    } else {
      return $localize `New House`
    }
  }
}
