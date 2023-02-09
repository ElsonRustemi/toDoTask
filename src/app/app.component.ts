import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { TaskCardComponent } from './task-card/task-card.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('container', { read: ViewContainerRef }) container:
    | ViewContainerRef
    | any;

  input = TaskCardComponent;

  constructor(private CFR: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  add() {
    const componentFactory = this.CFR.resolveComponentFactory(this.input);
    const component = this.container.createComponent(componentFactory);
  }

}
