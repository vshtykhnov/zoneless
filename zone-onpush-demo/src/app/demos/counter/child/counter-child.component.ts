import {
  Component,
  DoCheck,
  Input,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CounterGrandchildComponent } from '../grandchild/counter-grandchild.component';

@Component({
  selector: 'app-counter-child',
  standalone: true,
  imports: [CounterGrandchildComponent],
  template: `
    <div #container class="counter-block child">
      <p>Child counter (Zone + OnPush): {{ counter }}</p>
      <app-counter-grandchild [counter]="counter"></app-counter-grandchild>
    </div>
  `,
  styles: [
    `
      .counter-block {
        border: 2px solid #2196f3;
        padding: 8px;
        margin: 4px;
      }
      .child {
        background: #e3f2fd;
      }
      .flash-outline {
        box-shadow: 0 0 0 2px red;
        transition: box-shadow 0.2s ease;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterChildComponent implements DoCheck {
  @Input() counter = 0;
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('CounterChildComponent change detection (Zone + OnPush)');
    const el = this.container.nativeElement;
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
