import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent],
  template: `
    <div #container class="block">
      <p>Parent works! (Zoneless with OnPush)</p>
      <app-child></app-child>
    </div>
  `,
  styles: `
    .block { border: 2px solid green; padding: 24px; margin: 8px; }
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('ParentComponent change detection (Zoneless)');
    const el = this.container.nativeElement;
    this.renderer.addClass(el, 'flash-outline');

    clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(
      () => this.renderer.removeClass(el, 'flash-outline'),
      200
    );
  }
}
