import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CategorySegmentService {
    chosenSegment = "Men's Open";

    constructor() {

    }

    setSegment(newSegment: string) {
        this.chosenSegment = newSegment;
    }

    getSegment() {
        return this.chosenSegment;
    }

}
