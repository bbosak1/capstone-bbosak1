import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { TutorServiceProvider } from '../../providers/tutor-service/tutor-service';

@Injectable()
export class InputDialogServiceProvider {

  constructor(
    public alertCtrl: AlertController,
    public dataService: TutorServiceProvider) {
  }

  async showPrompt(student?, index?) {
    const prompt = await this.alertCtrl.create({
      header: student ? 'Edit Student' : 'Add Student',
      message: student ? "Please edit student..." : "Please enter student...",
      inputs: [
        {
          name: 'name',
          placeholder: 'Name',
          value: student ? student.name : null
        },
        {
          name: 'phoneNo',
          placeholder: 'Phone Number',
          value: student ? student.phoneNo : null
        },
        {
          name: 'emailAddr',
          placeholder: 'Email Address',
          value: student ? student.emailAddr : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (index !== undefined) {
              student.name = data.name;
              student.phoneNo = data.phoneNo;
              student.emailAddr = data.emailAddr;
              this.dataService.editStudent(student, index);
            }
            else {
              this.dataService.addStudent(data);
            }
          }
        }
      ]
    });
    await prompt.present();
  }

  async showApptPrompt(appt?, index?) {
    const prompt = await this.alertCtrl.create({
      header: appt ? 'Edit appt' : 'Add appt',
      message: appt ? "Please edit appt..." : "Please enter appt...",
      inputs: [
        {
          name: 'date',
          placeholder: 'Date',
          value: appt ? appt.date : null
        },
        {
          name: 'time',
          placeholder: 'Time',
          value: appt ? appt.time : null
        },
        {
          name: 'name',
          placeholder: 'Name',
          value: appt ? appt.name : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (index !== undefined) {
              appt.date = data.date;
              appt.time = data.time;
              appt.name = data.name;
            }
            else {
              this.dataService.addAppt(data);
            }
          }
        }
      ]
    });
    await prompt.present();
  }

  async showBlogPrompt(blog?, index?) {
    const prompt = await this.alertCtrl.create({
      header: blog ? 'Edit blog' : 'Add blog',
      message: blog ? "Please edit blog..." : "Please enter blog...",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: blog ? blog.title : null
        },
        {
          name: 'shortDescr',
          placeholder: 'Description',
          value: blog ? blog.shortDescr : null
        },
        {
          name: 'href',
          placeholder: 'Site link',
          value: blog ? blog.href : null
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
          }
        },
        {
          text: 'Save',
          handler: data => {
            if (index !== undefined) {
              blog.title = data.title;
              blog.shortDescr = data.shortDescr;
              blog.href = data.href;
            }
            else {
              this.dataService.addBlog(data);
            }
          }
        }
      ]
    });
    await prompt.present();
  }


}