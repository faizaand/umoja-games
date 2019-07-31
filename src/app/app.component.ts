import {Component} from '@angular/core';

import {AlertController, Events, Platform, ToastController} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';
import {DataService} from './data/data.service';
import {NetworkService} from './network.service';
import {SwUpdate} from '@angular/service-worker';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html'
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private db: DataService,
        private events: Events,
        private toastController: ToastController,
        private network: NetworkService,
        private alertCtrl: AlertController,
        private swUpdate: SwUpdate
    ) {
        this.initializeApp();
    }

    initializeApp() {
        this.platform.ready().then(() => {
            if (this.platform.is('ios') || this.platform.is('android')) {
                this.statusBar.styleDefault();
                this.splashScreen.hide();
            }

            this.db.getFollowedTeams();

            this.network.initializeNetworkEvents();

            // Offline event
            this.events.subscribe('network:offline', () => {
                this.toastController.create({
                    message: 'You are offline. Showing cached data.',
                    duration: 4000
                }).then(res => res.present());
                console.log('Offline');
            });

            // Online event
            this.events.subscribe('network:online', () => {
                this.toastController.create({
                    message: 'You are back online.',
                    duration: 4000
                }).then(res => res.present());
                console.log('Back online');
            });
        });

        this.swUpdate.available.subscribe(async () => {
            const alert = await this.alertCtrl.create({
                header: `App update available!`,
                message: `A newer version of the app is available. It's a very quick tap away!`,
                buttons: [
                    {
                        text: 'Cancel',
                        role: 'cancel',
                        cssClass: 'secondary',
                    }, {
                        text: 'Update',
                        handler: () => {
                            window.location.reload();
                        },
                    },
                ],
            });

            await alert.present();
        });
    }
}
