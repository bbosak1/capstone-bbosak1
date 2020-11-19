import { Injectable } from '@angular/core';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class EventServiceProvider {

  students: any = [];
  todos: any = [];
  appts: any = [];
  blogs: any = [];
  dataChanged$: Observable<boolean>;

  private dataChangeSubject: Subject<boolean>;

  eventURL = "http://localhost:8081/";
  todoURL  = "http://localhost:8082/";

  constructor(
    public callNumber: CallNumber,
    public emailComposer: EmailComposer,
    public http: HttpClient
  ) {
    this.dataChangeSubject = new Subject<boolean>();
    this.dataChanged$ = this.dataChangeSubject.asObservable();
  }

  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  private handleError (error: Response | any) {
    let errMsg: string;
    if (error instanceof Response) {
      const err = error || '';
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.log(errMsg);
    return Observable.throw(errMsg);
  }

  getEvents(): Observable<any> {
    return this.http.get(this.eventURL + 'api/events').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  removeStudent(student) {
    this.http.delete(this.eventURL + "api/events/" + student._id)
      .subscribe(res => {
        this.students = res;
        this.dataChangeSubject.next(true);
      });
  }

  addStudent(student) {
    this.http.post(this.eventURL + "api/events", student)
      .subscribe(res => {
        this.students = res;
        this.dataChangeSubject.next(true);
      });
  }

  // Add Todo
  addTodo(todo) {
    this.http.post(this.todoURL + "api/todos", todo)
      .subscribe(res => {
        this.todos = res;
        this.dataChangeSubject.next(true);
      })
  }

  removeTodo(todo) {
    this.http.delete(this.todoURL + "api/todos/" + todo._id)
    .subscribe(res => {
      this.todos = res;
      this.dataChangeSubject.next(true);
    });
  }

  // Add Blog post
  addBlog(blog) {
    this.http.post(this.todoURL + "api/blogs", blog)
      .subscribe(res => {
        this.blogs = res;
        this.dataChangeSubject.next(true);
      })
  }

  editStudent(student, index) {
    this.http.put(this.eventURL + "api/events/" + student._id, student)
      .subscribe(res => {
        this.students = res;
        this.dataChangeSubject.next(true);
      });
  }

  callStudent(student, i) {
    this.callNumber.callNumber(this.students.phoneNo, true)
      .then(res => console.log('Launched dialer!', res))
      .catch(err => console.log('Error launching dialer', err));
  }

  emailStudent(student, i) {
    const email = {
      to: this.students.emailAddr,
    }
    this.emailComposer.open(email)
      .then(res => console.log('Launched email!', res))
      .catch(err => console.log('Error launching email', err));
  }

  // Todos
  getTodos(): Observable<any> {
    return this.http.get(this.todoURL + 'api/todos').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

  // Blogs
  getBlogs(): Observable<any> {
    return this.http.get(this.todoURL + 'api/blogs').pipe(
      map(this.extractData),
      catchError(this.handleError)
    );
  }

}