import {Component, OnInit} from '@angular/core';
import {Player} from '../../../data/player';
import {ActivatedRoute} from '@angular/router';
import {DataService} from '../../../data/data.service';
import {AngularFireStorage} from '@angular/fire/storage';

@Component({
    selector: 'app-player-detail',
    templateUrl: './player-detail.page.html',
    styleUrls: ['./player-detail.page.scss'],
})
export class PlayerDetailPage implements OnInit {

    teamId: string;
    player: {};
    loading: boolean = true;

    constructor(private route: ActivatedRoute, private db: DataService, private storage: AngularFireStorage) {
    }

    ngOnInit() {
        const playerId = this.route.snapshot.params.playerId;

        this.db.getPlayerById$(playerId).subscribe(player => {
            const playerWithStats = Object.assign({}, player) as any;
            playerWithStats.appearances = 0;
            playerWithStats.goals = 0;
            playerWithStats.goalsAgainst = 0;
            playerWithStats.pog = 0;
            playerWithStats.yellowCards = 0;
            playerWithStats.redCards = 0;

            Object.values(player.matches).forEach(match => {
                playerWithStats.appearances += match.appearances;
                playerWithStats.goals += match.goals;
                playerWithStats.goalsAgainst += match.goalsAgainst;
                playerWithStats.pog += match.pog;
                playerWithStats.yellowCards += match.yellowCards;
                playerWithStats.redCards += match.redCards;
            });
            this.player = playerWithStats;
            this.loading = false;
            //
            // const ref = this.storage.ref('thumbs/512_' + player.imageUrl + '.jpg');
            // ref.getDownloadURL().subscribe(img => {this.player = {...player, imageUrl: img};
            //     this.loading = false;
            // }, error => {
            //     if(error.code === "storage/object-not-found") {
            //         this.player = {...playerWithStats, imageUrl: 'assets/profile_300.png'};
            //         this.loading = false;
            //     } else {
            //         console.log(error);
            //     }
            // });
        });
    }

    countries = {
        'alg': 'Algeria',
        'ang': 'Angola',
        'ben': 'Benin',
        'bot': 'Botswana',
        'bfa': 'Burkina Faso',
        'bdi': 'Burundi',
        'cmr': 'Cameroon',
        'cpv': 'Cape Verde',
        'cta': 'Central African Republic',
        'cha': 'Chad',
        'com': 'Comoros',
        'cod': 'Democratic Republic of the Congo',
        'dji': 'Djibouti',
        'egy': 'Egypt',
        'eqg': 'Equatorial Guinea',
        'eri': 'Eritrea',
        'eth': 'Ethiopia',
        'gab': 'Gabon',
        'gam': 'Gambia',
        'gha': 'Ghana',
        'gui': 'Guinea',
        'gnb': 'Guinea-Bissau',
        'civ': 'Ivory Coast',
        'ken': 'Kenya',
        'les': 'Lesotho',
        'lbr': 'Liberia',
        'lby': 'Libya',
        'mad': 'Madagascar',
        'mli': 'Mali',
        'mtn': 'Mauritania',
        'mri': 'Mauritius',
        'mar': 'Morocco',
        'moz': 'Mozambique',
        'nam': 'Namibia',
        'nig': 'Niger',
        'nga': 'Nigeria',
        'cgo': 'Republic of the Congo',
        'rwa': 'Rwanda',
        'stp': 'Sao Tome and Principe',
        'sen': 'Senegal',
        'sey': 'Seychelles',
        'sle': 'Sierra Leone',
        'som': 'Somalia',
        'rsa': 'South Africa',
        'ssd': 'South Sudan',
        'sdn': 'Sudan',
        'swz': 'Swaziland',
        'tan': 'Tanzania',
        'tog': 'Togo',
        'tun': 'Tunisia',
        'uga': 'Uganda',
        'esh': 'Western Sahara',
        'zam': 'Zambia',
        'zim': 'Zimbabwe',
        'afg': 'Afghanistan',
        'arm': 'Armenia',
        'aze': 'Azerbaijan',
        'bhr': 'Bahrain',
        'ban': 'Bangladesh',
        'bhu': 'Bhutan',
        'bru': 'Brunei',
        'mya': 'Burma',
        'cam': 'Cambodia',
        'chn': 'China',
        'cyp': 'Cyprus',
        'geo': 'Georgia',
        'hkg': 'Hong Kong',
        'ind': 'India',
        'irn': 'Iran',
        'irq': 'Iraq',
        'isr': 'Israel',
        'jpn': 'Japan',
        'jor': 'Jordan',
        'kaz': 'Kazakhstan',
        'kuw': 'Kuwait',
        'kgz': 'Kyrgyzstan',
        'lao': 'Laos',
        'lib': 'Lebanon',
        'mac': 'Macau',
        'mas': 'Malaysia',
        'mdv': 'Maldives',
        'mng': 'Mongolia',
        'nep': 'Nepal',
        'prk': 'North Korea',
        'oma': 'Oman',
        'pak': 'Pakistan',
        'ple': 'Palestine',
        'phi': 'Philippines',
        'qat': 'Qatar',
        'ksa': 'Saudi Arabia',
        'sin': 'Singapore',
        'kor': 'South Korea',
        'sri': 'Sri Lanka',
        'syr': 'Syria',
        'tpe': 'Taiwan',
        'tjk': 'Tajikistan',
        'tha': 'Thailand',
        'tkm': 'Turkmenistan',
        'uae': 'United Arab Emirates',
        'uzb': 'Uzbekistan',
        'vie': 'Vietnam',
        'yem': 'Yemen',
        'alb': 'Albania',
        'and': 'Andorra',
        'aut': 'Austria',
        'blr': 'Belarus',
        'bel': 'Belgium',
        'bih': 'Bosnia and Herzegovina',
        'bul': 'Bulgaria',
        'cro': 'Croatia',
        'cze': 'Czech Republic',
        'den': 'Denmark',
        'eng': 'England',
        'est': 'Estonia',
        'fro': 'Faroe Islands',
        'fin': 'Finland',
        'fra': 'France',
        'ger': 'Germany',
        'gre': 'Greece',
        'hun': 'Hungary',
        'isl': 'Iceland',
        'irl': 'Ireland',
        'ita': 'Italy',
        'kos': 'Kosovo',
        'lva': 'Latvia',
        'lie': 'Liechtenstein',
        'ltu': 'Lithuania',
        'lux': 'Luxembourg',
        'mkd': 'Macedonia',
        'mwi': 'Malawi',
        'mlt': 'Malta',
        'mda': 'Moldova',
        'mco': 'Monaco',
        'mne': 'Montenegro',
        'ned': 'Netherlands',
        'nir': 'Northern Ireland',
        'nor': 'Norway',
        'pol': 'Poland',
        'por': 'Portugal',
        'rou': 'Romania',
        'rus': 'Russia',
        'smr': 'San Marino',
        'sco': 'Scotland',
        'srb': 'Serbia',
        'svk': 'Slovakia',
        'svn': 'Slovenia',
        'esp': 'Spain',
        'swe': 'Sweden',
        'sui': 'Switzerland',
        'tur': 'Turkey',
        'ukr': 'Ukraine',
        'gbr': 'United Kingdom',
        'vat': 'Vatican City',
        'wal': 'Wales',
        'aia': 'Anguilla',
        'atg': 'Antigua and Barbuda',
        'aru': 'Aruba',
        'bah': 'Bahamas',
        'brb': 'Barbados',
        'blz': 'Belize',
        'ber': 'Bermuda',
        'vgb': 'British Virgin Islands',
        'can': 'Canada',
        'cay': 'Cayman Islands',
        'crc': 'Costa Rica',
        'cub': 'Cuba',
        'cuw': 'Curacao',
        'dma': 'Dominica',
        'dom': 'Dominican Republic',
        'slv': 'El Salvador',
        'grn': 'Grenada',
        'gua': 'Guatemala',
        'hai': 'Haiti',
        'hon': 'Honduras',
        'jam': 'Jamaica',
        'mex': 'Mexico',
        'msr': 'Montserrat',
        'nca': 'Nicaragua',
        'pan': 'Panama',
        'pur': 'Puerto Rico',
        'skn': 'Saint Kitts and Nevis',
        'lca': 'Saint Lucia',
        'vin': 'Saint Vincent and the Grenadines',
        'tca': 'Turks and Caicos Islands',
        'vir': 'US Virgin Islands',
        'usa': 'United States',
        'wif': 'West Indies',
        'asa': 'American Samoa',
        'aus': 'Australia',
        'cok': 'Cook Islands',
        'tls': 'East Timor',
        'fij': 'Fiji',
        'gum': 'Guam',
        'idn': 'Indonesia',
        'kir': 'Kiribati',
        'mhl': 'Marshall Islands',
        'fsm': 'Micronesia',
        'nru': 'Nauru',
        'ncl': 'New Caledonia',
        'nzl': 'New Zealand',
        'plw': 'Palau',
        'png': 'Papua New Guinea',
        'sam': 'Samoa',
        'sol': 'Solomon Islands',
        'tah': 'Tahiti',
        'tga': 'Tonga',
        'tuv': 'Tuvalu',
        'van': 'Vanuatu',
        'arg': 'Argentina',
        'bol': 'Bolivia',
        'bra': 'Brazil',
        'chi': 'Chile',
        'col': 'Colombia',
        'ecu': 'Ecuador',
        'guy': 'Guyana',
        'par': 'Paraguay',
        'per': 'Peru',
        'sur': 'Suriname',
        'tri': 'Trinidad and Tobago',
        'uru': 'Uruguay',
        'ven': 'Venezuela',
    };

}
