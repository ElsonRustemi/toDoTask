import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { faClosedCaptioning, faEdit, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faPlus } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  faEdit = faEdit;
  faClose = faWindowClose;
  faAdd = faPlus;
  title = 'toDoList';
  tasks: any;
  task: any;
  index: any;
  // newTask: any;
  // addTaskForm: FormGroup;
  addTaskForm = this.fb.group({
    id: [''],
    title: [''],
    content: [''],
  });

  @ViewChild('editModal') editModal: any; // Note: TemplateRe
  @ViewChild('addTaskModal') addTaskModal: any; // Note: TemplateRe
  @ViewChild('deleteTaskModal') deleteTaskModal: any; // Note: TemplateRe

  constructor(
    private http: HttpClient,
    private modalService: NgbModal,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.getTasks();

  }

  addTask() {
    const headers = { 'content-type': 'application/json' };
    let body = {
      id: this.tasks.length + 1,
      title: this.addTaskForm?.value.title,
      content: this.addTaskForm?.value.content,
    };
    this.http
      .post('http://localhost:3000/tasks', body, { headers: headers })
      .subscribe((data) => {
        this.getTasks();
      });
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

  deleteModal(task: any) {
    this.task = task;
    this.modalService.open(this.deleteTaskModal);
  }

  openModal(task: any) {
    this.task = task;
    this.modalService.open(this.editModal);
  }

  onDrop(event: any) {
    event.preventDefault();
    event.stopPropagation();
    // your code goes here after droping files or any
  }

  onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }

  onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
  }
}
