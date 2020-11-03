import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ToastController, AlertController } from '@ionic/angular';
import { TutorServiceProvider } from '../../providers/tutor-service/tutor-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  events = [];
  errorMessage: string;
  title = "Tutor";

  constructor (
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    public dataService: TutorServiceProvider,
    public inputDialogService: InputDialogServiceProvider,
    ) {
      this.loadEvents();
      console.log('loaded events');
      dataService.dataChanged$.subscribe((dataChanged: boolean) => {
        this.loadEvents();
      }
    );
  }

  loadEvents() {
    this.dataService.getEvents()
      .subscribe (
        events => this.events = events,
        error => this.errorMessage = <any>error
      );
  }

  removeStudent(student) {
    this.dataService.removeStudent(student);
  }

  editStudent(student, index) {
    this.inputDialogService.showPrompt(student, index);
  }

  callStudent(student, i) {
    this.dataService.callStudent(student,i);
  }

  emailStudent(student, i) {
    this.dataService.emailStudent(student, i);
  }

  addStudent() {
    this.inputDialogService.showPrompt();
  }

}
