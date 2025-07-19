import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-grandchild',
  standalone: true,
  template: `
    <div #container class="block">
      <p>GrandchildComponent (OnPush)</p>
    </div>
  `,
  styles: `
    .block { border: 2px solid orange; padding: 24px; margin: 8px; }
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrandchildComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('GrandchildComponent change detection (Zoneless)');
    const el = this.container.nativeElement;
    this.renderer.addClass(el, 'flash-outline');

    clearTimeout(this.flashTimeout);
    this.flashTimeout = setTimeout(
      () => this.renderer.removeClass(el, 'flash-outline'),
      200
    );
  }
}
