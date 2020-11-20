import { Component } from '@angular/core';
import { EventServiceProvider } from '../../providers/event-service/event-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  todos = [];
  errorMessage: string;
  show: boolean = true;

  constructor(
    public dataService: EventServiceProvider,
    public inputDialogService: InputDialogServiceProvider,
  ) {
    this.loadTodos();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadTodos();
    })
  }

  onChange($event) {
    console.log($event.format('MM-DD-YYYY'));
  }

  loadTodos() {
    this.dataService.getTodos()
      .subscribe (
        todos => this.todos = todos,
        error => this.errorMessage = <any>error
      );
  }

  addTodo() {
    this.inputDialogService.showTodoPrompt();
  }

  removeTodo(todo) {
    this.dataService.removeTodo(todo);
  }

}
