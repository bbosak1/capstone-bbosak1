import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

@Injectable()
export class InputDialogServiceProvider {

  constructor(
    public alertCtrl: AlertController,
    public dataService: EventServiceProvider) {
  }

  async showPrompt(event?, index?) {
    const prompt = await this.alertCtrl.create({
      header: event ? 'Edit Event' : 'Add Event',
      message: event ? "Please edit event..." : "Please enter event...",
      inputs: [
        {
          name: 'title',
          placeholder: 'Title',
          value: event ? event.title : null
        },
        {
          name: 'date',
          placeholder: 'Date',
          value: event ? event.date : null
        },
        {
          name: 'timeSt',
          placeholder: 'Start time',
          value: event ? event.timeSt : null
        },
        {
          name: 'timeEnd',
          placeholder: 'End Time',
          value: event ? event.timeEnd : null
        },
        {
          name: 'loc',
          placeholder: 'Location',
          value: event ? event.loc : null
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
              event.title = data.title;
              event.date = data.date;
              event.timeSt = data.timeSt;
              event.timeEnd = data.timeEnd;
              event.loc = data.loc;
              this.dataService.editEvent(event, index);
            }
            else {
              this.dataService.addEvent(data);
            }
          }
        }
      ]
    });
    await prompt.present();
  }

  async showTodoPrompt(todo?, index?) {
    const prompt = await this.alertCtrl.create({
      header: todo ? 'Edit todo' : 'Add todo',
      message: todo ? "Please edit todo..." : "Please enter todo...",
      inputs: [
        {
          name: 'descr',
          placeholder: 'Description',
          value: todo ? todo.descr : null
        },
        {
          name: 'assignee',
          placeholder: 'Assignee',
          value: todo ? todo.assignee : null
        },
        // {
        //   name: 'name',
        //   placeholder: 'Name',
        //   value: todo ? todo.name : null
        // },
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
              todo.descr = data.descr;
              todo.assignee = data.assignee;
            }
            else {
              this.dataService.addTodo(data);
            }
          }
        }
      ]
    });
    await prompt.present();
  }

}