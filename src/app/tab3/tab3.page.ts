import { Component } from '@angular/core';
import { TutorServiceProvider } from '../../providers/tutor-service/tutor-service';
import { InputDialogServiceProvider } from '../../providers/input-dialog-service/input-dialog-service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  blogs = [];
  errorMessage: string;
  show: boolean = true;

  constructor(
    public dataService: TutorServiceProvider,
    public inputDialogService: InputDialogServiceProvider,
  ) {
    this.loadBlogs();
    dataService.dataChanged$.subscribe((dataChanged: boolean) => {
      this.loadBlogs();
    })
  }

  loadBlogs() {
    this.dataService.getBlogs()
      .subscribe (
        blogs => this.blogs = blogs,
        error => this.errorMessage = <any>error
      );
  }

  addBlog() {
    this.inputDialogService.showBlogPrompt();
  }

}
