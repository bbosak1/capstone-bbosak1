import { Component } from '@angular/core';
import { TutorServiceProvider } from '../../providers/tutor-service/tutor-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  appts = [];
  errorMessage: string;
  show: boolean = true;

  constructor(
    public dataService: TutorServiceProvider,
    public inputDialogService: InputDialogServiceProvider,
  ) {
    this.loadAppts();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadAppts();
    })
  }

  onChange($event) {
    console.log($event.format('MM-DD-YYYY'));
  }

  loadAppts() {
    this.dataService.getAppts()
      .subscribe (
        appts => this.appts = appts,
        error => this.errorMessage = <any>error
      );
  }

  addAppt() {
    this.inputDialogService.showApptPrompt();
  }

}
