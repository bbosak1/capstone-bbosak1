import { Injectable } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { EventServiceProvider } from '../../providers/event-service/event-service';

@Injectable()
export class InputDialogServiceProvider {

  constructor(
    public alertCtrl: AlertController,
    public dataService: EventServiceProvider) {
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