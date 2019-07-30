import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'goalkeepers',
    pure: false
})
export class GoalkeepersPipe implements PipeTransform {
    transform(items: any[], filter): any {
        if (!items || !filter) {
            return items;
        }
        if(filter !== 'Goalie Leaders') return items;

        return items.filter(item => item.position === "Goalkeeper");
    }
}
