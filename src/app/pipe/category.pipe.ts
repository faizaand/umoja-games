import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'category'
})
export class CategoryPipe implements PipeTransform {

    transform(items: any[], category: any): any {
        if (!items || !category) {
            return items;
        }
        return items.filter(item => item.category === category);
    }

}
