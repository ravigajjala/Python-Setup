
import { Pipe, PipeTransform } from '@angular/core';

import { PlugToDeliver } from '../providers/classes/plantInfo.class';
@Pipe({ name: 'SearchVarieties' })
export class SearchVarietiesPipe implements PipeTransform {
    transform(allVarieties: PlugToDeliver[], inputValue: any) {
        if (!allVarieties) {
            return [];
        }
        if (!inputValue) {
            return allVarieties;
        }
        return allVarieties.filter(varietyObj => {
            return varietyObj.name.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
        });
    }
}
