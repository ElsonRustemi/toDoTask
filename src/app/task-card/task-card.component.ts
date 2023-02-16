import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder } from '@angular/forms';
import { faEdit, faWindowClose } from '@fortawesome/free-regular-svg-icons';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { TaskParentComponent } from '../task-parent/task-parent.component';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent implements OnInit {

  public unique_key!: number;
  public parentRef!: TaskParentComponent;

  faEdit = faEdit;
  faClose = faWindowClose;
  faAdd = faPlus;
  faDelete = faMinus;
  title = 'toDoList';
  tasks: any;
  task: any;
  index: any;

  toggle!: boolean;
  taskCompleted!: boolean;


  addTaskForm = this.fb.group({
    id: [''],
    title: [''],
    content: ['']
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
      title: this.addTaskForm?.value.title,
      content: this.addTaskForm?.value.content,
    };
    this.http
      .post('http://localhost:3000/tasks', body, { headers: headers })
      .subscribe((data) => {
        this.resetForm();
        this.getTasks();
      });
  }

  resetForm() {
    this.addTaskForm.reset();
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

  remove_me() {
    console.log(this.unique_key)
    this.parentRef.remove(this.unique_key)
  }

  doneTask(task: any) {
    // console.log("Clicked");
    console.log(task.id);
    // task.toggle ? false : true;
    // this.toggle = !this.toggle;
    this.taskCompleted = !this.taskCompleted;
  }
}
