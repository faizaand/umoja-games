import {Component, OnInit} from '@angular/core';
import {NavController, Platform} from '@ionic/angular';

@Component({
    selector: 'app-preflight',
    templateUrl: './preflight.page.html',
    styleUrls: ['./preflight.page.scss'],
})
export class PreflightPage implements OnInit {

    slideOpts = {
        initialSlide: 0,
        speed: 400
    };
    isIOS: boolean = false;
    isAndroid: boolean = false;
    displayPage: boolean = true;

    constructor(private navController: NavController,
                private platform: Platform) {
        this.isIOS = platform.is('ios');
        this.isAndroid = platform.is('android');
        if (!this.isMobile() || this.isPWA() || this.isTablet()) {
            this.displayPage = false;
            navController.navigateRoot('/app/tabs/home');
        }
    }

    continueToSplash() {
        this.displayPage = false;
        this.navController.navigateRoot('/app/tabs/home');
    }

    runInBrowser() {
        // todo store this preference
        this.continueToSplash();
    }

    ngOnInit() {
    }

    isMobile(): boolean {
        return this.platform.is('mobile');
    }

    isPWA(): boolean {
        return this.platform.is('pwa');
    }

    isTablet(): boolean {
        return this.platform.is('tablet');
    }

    isFullScreen(): boolean {
        return (window.innerHeight === screen.height);
    }

}
