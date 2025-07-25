import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
} from '@angular/core';
import { ParentComponent } from './demos/forms/parent/parent.component';
import { CoalescingDemoComponent } from './demos/coalesce/coalescing-demo/coalescing-demo.component';
import { TreeDemoComponent } from './demos/tree/tree-demo/tree-demo.component';
import { TreeOnPushDemoComponent } from './demos/tree/tree-onpush-demo/tree-onpush-demo.component';
import { TreeOnPushDemoComponent as TreeOnPushDemoComponentNew } from './demos/tree-onpush-demo/tree-onpush-demo.component';
import { MouseTestComponent } from './demos/forms/mouse-test/mouse-test.component';
import { TimerComponent } from './demos/forms/timer/timer.component';
import { AsyncSignalsDemoComponent } from './demos/async-signals-demo/async-signals-demo.component';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ParentComponent,
    CoalescingDemoComponent,
    TreeDemoComponent,
    TreeOnPushDemoComponent,
    TreeOnPushDemoComponentNew,
    MouseTestComponent,
    TimerComponent,
    AsyncSignalsDemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'zoneless-demo';

  view:
    | 'forms'
    | 'coalesce'
    | 'tree'
    | 'tree-onpush'
    | 'tree-onpush-new'
    | 'async-signals' = 'forms';
  isRefreshPhase = false;

  @ViewChild('appContainer', { static: false })
  appContainer!: ElementRef<HTMLElement>;

  constructor() {}

  select(
    view:
      | 'forms'
      | 'coalesce'
      | 'tree'
      | 'tree-onpush'
      | 'tree-onpush-new'
      | 'async-signals'
  ) {
    this.view = view;
  }
}
