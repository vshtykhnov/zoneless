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

@Component({
  selector: 'app-counter-grandchild',
  standalone: true,
  template: `
    <div #container class="counter-block grandchild">
      <p>Grandchild counter (Zone + OnPush): {{ counter }}</p>
    </div>
  `,
  styles: [
    `
      .counter-block {
        border: 2px solid #ff9800;
        padding: 8px;
        margin: 4px;
      }
      .grandchild {
        background: #fff3e0;
      }
      .flash-outline {
        box-shadow: 0 0 0 2px red;
        transition: box-shadow 0.2s ease;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterGrandchildComponent implements DoCheck {
  @Input() counter = 0;
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('CounterGrandchildComponent change detection (Zone + OnPush)');
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
