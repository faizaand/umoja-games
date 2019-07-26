import {Component} from '@angular/core';
import {Storage} from '@ionic/storage';
import {AlertController} from '@ionic/angular';

@Component({
    selector: 'app-tabs',
    templateUrl: 'tabs.page.html',
    styleUrls: ['tabs.page.scss']
})
export class TabsPage {

    umoji: boolean = false;

    constructor(private storage: Storage) {
    }

    ngOnInit() {
        this.storage.get('umoji').then(value => {
            this.umoji = value;
        });
    }
}
