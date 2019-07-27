import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';
import {SplashScreen} from '@ionic-native/splash-screen/ngx';
import {StatusBar} from '@ionic-native/status-bar/ngx';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {PipesModule} from './pipes/pipes.module';

import {AngularFireModule} from 'angularfire2';
import {AngularFirestoreModule} from 'angularfire2/firestore';
import {firebaseConfig} from './credentials';

import {Camera} from '@ionic-native/camera/ngx';
import {EmailComposer} from '@ionic-native/email-composer/ngx';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import {IonicStorageModule} from '@ionic/storage';
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Network} from '@ionic-native/network/ngx';

@NgModule({
    declarations: [AppComponent],
    entryComponents: [ ],
    imports: [
        BrowserModule,
        IonicModule.forRoot(),
        AppRoutingModule,
        PipesModule,
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFirestoreModule,
        AngularFirestoreModule.enablePersistence(),
        AngularFireStorageModule,
        IonicStorageModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        EmailComposer,
        InAppBrowser,
        Network,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: StorageBucket, useValue: 'umoja-games-ab076.appspot.com'}
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
