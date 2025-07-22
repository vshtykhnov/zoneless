import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  ChangeDetectionStrategy,
  ViewChild,
  Input,
} from '@angular/core';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-grandchild',
  standalone: true,
  template: `
    <div #container class="block">
      <p>GrandchildComponent (OnPush){{ isRefreshPhase ? flash() : '' }}</p>
    </div>
  `,
  styles: `
    .block { border: 2px solid orange; padding: 24px; margin: 8px; }
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GrandchildComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  constructor(
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 GrandchildComponent change detection (Zoneless)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
