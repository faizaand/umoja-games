import {Component, OnInit} from '@angular/core';
import {DataService} from '../../data/data.service';
import {Place} from '../../data/place';
import {Plugins} from '@capacitor/core';

const {Browser, Geolocation} = Plugins;

@Component({
    selector: 'app-eats',
    templateUrl: './eats.page.html',
    styleUrls: ['./eats.page.scss'],
})
export class EatsPage implements OnInit {

    eats: Place[];
    currentLatitude;
    currentLongitude;
    distances: any[] = [];

    constructor(private db: DataService) {
    }

    ngOnInit() {
        this.db.getEats().then(value => {
            this.eats = value.docs.map(p => p.data() as Place);
            this.getCurrentPosition();
        });
    }

    open(link) {
        Browser.open({url: link});
    }

    haversine(lat1, lon1, lat2, lon2) {
        const R = 6371e3; // metres
        const g1 = this.toRadians(lat1);
        const g2 = this.toRadians(lat2);
        const d1 = this.toRadians(lat2 - lat1);
        const d2 = this.toRadians(lon2 - lon1);

        const a = Math.sin(d1 / 2) * Math.sin(d1 / 2) +
            Math.cos(g1) * Math.cos(g2) *
            Math.sin(d2 / 2) * Math.sin(d2 / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        let dist = R * c / 1609.34; // to miles
        let fixed = dist.toFixed(dist > 10 ? 0 : 2);

        let distKm = dist * 1.60934; // to km
        let fixedKm = distKm.toFixed(distKm > 10 ? 0 : 2);

        return {miles: fixed, km: fixedKm};
    }

    async getCurrentPosition() {
        this.distances = [];
        const position = await Geolocation.getCurrentPosition();
        this.currentLatitude = position.coords.latitude;
        this.currentLongitude = position.coords.longitude;

        this.eats.forEach(place => {
            const dist = this.haversine(this.currentLatitude, this.currentLongitude, Number.parseFloat(place.lat), Number.parseFloat(place.long));
            this.distances.push({placeName: place.name, distance: dist.miles, distanceKm: dist.km});
        });
    }

    toRadians(degrees) {
        return degrees * (Math.PI / 180);
    }

    getDistanceFor(placeName) {
        const place = this.distances.filter(d => d.placeName === placeName)[0];
        if(place) {
            return place || '...';
        } else {
            return '...';
        }
    }

}
