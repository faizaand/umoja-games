import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'entities'
})
export class EntitiesPipe implements PipeTransform {

    transform(item): any {
        return item.replace("&#8217;", "'")
    }

}
