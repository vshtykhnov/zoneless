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
import { MouseTestComponent } from './demos/forms/mouse-test/mouse-test.component';
import { TimerComponent } from './demos/forms/timer/timer.component';
import { AsyncSignalsDemoComponent } from './demos/cards-demo/cards-demo.component';
import { TreeOnPushDemoComponent } from './demos/tree-onpush-demo/tree-onpush-demo.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    ParentComponent,
    CoalescingDemoComponent,
    TreeDemoComponent,
    MouseTestComponent,
    TimerComponent,
    AsyncSignalsDemoComponent,
    TreeOnPushDemoComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'zone-demo';

  view: 'forms' | 'coalesce' | 'tree' | 'cards' | 'tree-onpush' = 'forms';
  isRefreshPhase = false;

  private flashTimeout: any;
  @ViewChild('appContainer', { static: false })
  appContainer!: ElementRef<HTMLElement>;

  select(view: 'forms' | 'coalesce' | 'tree' | 'cards' | 'tree-onpush') {
    this.view = view;
  }
}
