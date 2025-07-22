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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements DoCheck {
  title = 'zone-onpush-demo';

  view: 'forms' | 'coalesce' | 'tree' = 'forms';
  isRefreshPhase = false;

  private flashTimeout: any;
  @ViewChild('appContainer', { static: false })
  appContainer!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  select(view: 'forms' | 'coalesce' | 'tree') {
    this.view = view;
  }

  ngDoCheck() {
    console.log('AppComponent change detection (Zone)');
    if (this.appContainer?.nativeElement) {
      const el = this.appContainer.nativeElement;
      this.renderer.addClass(el, 'flash-outline');
      this.ngZone.runOutsideAngular(() => {
        clearTimeout(this.flashTimeout);
        this.flashTimeout = setTimeout(
          () => this.renderer.removeClass(el, 'flash-outline'),
          200
        );
      });
    }
  }
}
