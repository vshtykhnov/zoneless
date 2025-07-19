import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { GrandchildComponent } from '../grandchild/grandchild.component';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [GrandchildComponent, CheckoutFormComponent],
  template: `
    <div #container class="block" style="border: 2px dashed lightblue;">
      <p>Child works! (Zoneless with OnPush)</p>
      <app-checkout-form></app-checkout-form>
      <app-grandchild></app-grandchild>
    </div>
  `,
  styles: `
    .block { padding: 24px; margin: 8px; }
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
   `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2, private cdr: ChangeDetectorRef) {}

  ngDoCheck() {
    console.log('ChildComponent change detection (Zoneless)');
    const el = this.container.nativeElement;
    this.renderer.addClass(el, 'flash-outline');

    clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(
      () => this.renderer.removeClass(el, 'flash-outline'),
      200
    );
  }
}
