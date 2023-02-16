import {
  ComponentRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ViewChild,
  Component,
  ViewRef,
  OnInit,
} from '@angular/core';
import { TaskCardComponent } from '../task-card/task-card.component';

@Component({
  selector: 'app-task-parent',
  templateUrl: './task-parent.component.html',
  styleUrls: ['./task-parent.component.scss'],
})
export class TaskParentComponent implements OnInit {
  @ViewChild('viewContainerRef', { read: ViewContainerRef })
  VCR!: ViewContainerRef;

  child_unique_key: number = 0;
  componentsReferences = Array<ComponentRef<TaskCardComponent>>();

  constructor(private CFR: ComponentFactoryResolver) {}

  ngOnInit(): void {}

  createComponent() {
    let componentFactory = this.CFR.resolveComponentFactory(TaskCardComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = ++this.child_unique_key;
    childComponent.parentRef = this;

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);
  }

  remove(key: number) {
    if (this.VCR.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      (x) => x.instance.unique_key == key
    )[0];

    console.log(componentRef);
    

    // let vcrIndex: number = this.VCR.indexOf(componentRef as any);
    let vcrIndex: number = this.VCR.indexOf(componentRef.hostView);
    // let vcrIndex: number = 0
    console.log(vcrIndex);

    // removing component from container
    this.VCR.remove(vcrIndex);

    // removing component from the list
    this.componentsReferences = this.componentsReferences.filter(
      (x) => x.instance.unique_key !== key
    );
  }
}
