import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  Input,
} from '@angular/core';
import { GrandchildComponent } from '../grandchild/grandchild.component';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-child',
  standalone: true,
  imports: [GrandchildComponent, CheckoutFormComponent],
  template: `
    <div #container class="block" style="border: 2px dashed lightblue;">
      <p>ChildComponent (Default){{ isRefreshPhase ? flash() : '' }}</p>
      <app-checkout-form [isRefreshPhase]="isRefreshPhase"></app-checkout-form>
      <app-grandchild [isRefreshPhase]="isRefreshPhase"></app-grandchild>
    </div>
  `,
  styles: `
    .block { padding: 24px; margin: 8px; }
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
   `,
})
export class ChildComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 ChildComponent change detection (Zone)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
