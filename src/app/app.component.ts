import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'toDoList';
  tasks: any;
  task: any;
  index: any;
  // newTask: any;
  addTaskForm: FormGroup | undefined;

  @ViewChild('editModal') editModal: any; // Note: TemplateRe
  @ViewChild('addTaskModal') addTaskModal: any; // Note: TemplateRe


  constructor(private http: HttpClient, private modalService: NgbModal, private fb: FormBuilder) {}
  ngOnInit(): void {
    // this.addTaskForm = new FormGroup({
    //   id: new FormControl(),
    //   title: new FormControl(),
    //   content: new FormControl
    // })

    this.addTaskForm = this.fb.group({
      id: [],
      title: [],
      content: []
    })
    this.getTasks();
  }

  addTask() {
    let body = {
        id: this.tasks.length + 1,
        title: "To do 1",
        content: "This is the first to do"
    }
    // this.http.post('http://localhost:3000/tasks', ).subscribe(data => {})
  }

  getTasks() {
    this.http.get('http://localhost:3000/tasks').subscribe((res) => {
      this.tasks = res;
    });
  }

  updateTask() {
    this.http
      .put('http://localhost:3000/tasks/' + this.task.id, this.task)
      .subscribe((data) => {
        console.log(data);

        // console.log(task);
        this.getTasks();
      });
  }

  deleteTask(index: any) {
    this.http
      .delete('http://localhost:3000/tasks/' + index.id)
      .subscribe((data) => {
        this.getTasks();
      });
  }

  openAddModal() {
    // this.task = task;
    this.modalService.open(this.addTaskModal);
  }

  openModal(task: any) {
    this.task = task;
    this.modalService.open(this.editModal);
  }
}
