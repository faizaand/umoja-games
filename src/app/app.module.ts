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
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';

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
        AngularFireStorageModule,
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [
        StatusBar,
        SplashScreen,
        Camera,
        EmailComposer,
        {provide: RouteReuseStrategy, useClass: IonicRouteStrategy},
        {provide: StorageBucket, useValue: 'umoja-games-ab076.appspot.com'}
    ],
    exports: [
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
