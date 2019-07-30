import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AlertController} from '@ionic/angular';
import {DataService} from '../../../data/data.service';
import {categories} from '../../../data/categories';
import fixOrientation from 'fix-orientation';
import {Registration} from '../../../data/registration';

import {firestore} from 'firebase';

@Component({
    selector: 'app-admin-check-in',
    templateUrl: './admin-check-in.page.html',
    styleUrls: ['./admin-check-in.page.scss'],
})
export class AdminCheckInPage implements OnInit {

    @ViewChild('idCamera') idCamera: ElementRef;
    @ViewChild('playerCamera') playerCamera: ElementRef;

    categorizedTeams;
    checkInForm: Registration = {} as any;
    teams: string[] = [];
    ready: boolean = false;

    constructor(private data: DataService, private alert: AlertController) {
    }

    ngOnInit() {
        this.categorizedTeams = categories.map(value => value.name);

        this.registerIdPhotoProcessor();
        this.registerPlayerPhotoProcessor();
    }

    categorySelected() {
        this.data.getTeamsByCategory(this.checkInForm.category).forEach(teams => {
            this.teams = teams.map(team => team.name);
        });
    }

    registerIdPhotoProcessor() {
        const idElement = this.idCamera.nativeElement as HTMLInputElement;
        idElement.onchange = () => {
            const reader = new FileReader();
            reader.onload = (r: any) => {

                let base64 = r.target.result as string;

                fixOrientation(base64, {image: true}, (fixed: string, image: any) => {
                    this.checkInForm.idPhoto = fixed;
                });
            };

            reader.readAsDataURL(idElement.files[0]);
        };
    }

    registerPlayerPhotoProcessor() {
        const playerElement = this.playerCamera.nativeElement as HTMLInputElement;
        playerElement.onchange = () => {
            const reader = new FileReader();
            reader.onload = (r: any) => {
                let base64 = r.target.result as string;

                fixOrientation(base64, {image: true}, (fixed: string, image: any) => {
                    this.checkInForm.playerPhoto = fixed;
                    console.log(fixed);
                });
            };

            reader.readAsDataURL(playerElement.files[0]);
        };
    }

    dobSelected($event) {
        $event.preventDefault();
        const d = new Date($event.target.value);
        this.checkInForm.dob = d.getDate() + '/' + d.getMonth() + '/' + d.getFullYear();
    }

    submit() {
        this.commitData()
            .then(() => {
                this.alert.create({
                    header: 'Success',
                    message: 'This check-in has been submitted!',
                    buttons: ['OK']
                }).then(value => value.present());
            })
            .catch(reason => {
                console.log(reason);
                this.alert.create({
                    header: 'Uh oh',
                    message: 'Could not submit your check-in. Make sure you are connected to the Internet.',
                    buttons: ['OK']
                }).then(value => value.present());
            });
    }

    async commitData() {
        await this.data.addRegistrationImages(this.checkInForm.name, this.checkInForm.idPhoto, this.checkInForm.playerPhoto);
        this.checkInForm.idPhoto = "/registrations/" + this.checkInForm.name.toLowerCase().replace(/ /g, "-") + "/id.png";
        this.checkInForm.playerPhoto = "/registrations/" + this.checkInForm.name.toLowerCase().replace(/ /g, "-") + "/player.png";
        await this.data.addRegistration(this.checkInForm);
        return null;
    }

}
