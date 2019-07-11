import {NgModule} from '@angular/core';
import {CategoryPipe} from './category.pipe';

@NgModule({
    declarations: [
        CategoryPipe
    ],
    imports: [],
    exports: [
        CategoryPipe
    ]
})
export class PipeModule {
    public static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}
