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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, ParentComponent, CoalescingDemoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements DoCheck {
  title = 'zoneless-demo';

  view: 'forms' | 'coalesce' = 'forms';

  private flashTimeout: any;
  @ViewChild('appContainer', { static: false })
  appContainer!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  select(view: 'forms' | 'coalesce') {
    this.view = view;
  }

  ngDoCheck() {
    console.log('AppComponent change detection (Zoneless)');
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
