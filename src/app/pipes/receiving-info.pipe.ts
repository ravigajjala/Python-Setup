import { Pipe, PipeTransform } from '@angular/core';

import { PlugToDeliver } from '../providers/classes/plantInfo.class';
@Pipe({ name: 'ReceivingInfoPipe' })
export class ReceivingInfoPipe implements PipeTransform {
    transform(allVarieties: PlugToDeliver[]) {
        if (!allVarieties) {
            return [];
        }
        return allVarieties.filter(varietyObj => {
            return varietyObj.receivedInfoFromOtherStations;
        });
    }
}
