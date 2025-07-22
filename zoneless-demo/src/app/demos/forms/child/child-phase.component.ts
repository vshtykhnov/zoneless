import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
  Input,
} from '@angular/core';
import { GrandchildPhaseComponent } from '../grandchild/grandchild-phase.component';
import { CheckoutFormComponent } from '../checkout-form/checkout-form.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-child-phase',
  standalone: true,
  imports: [GrandchildPhaseComponent, CheckoutFormComponent],
  template: `
    <div #container class="block" style="border: 2px dashed lightblue;">
      <p>ChildComponent (OnPush){{ isRefreshPhase ? flash() : '' }}</p>
      <app-checkout-form [isRefreshPhase]="isRefreshPhase"></app-checkout-form>
      <app-grandchild-phase
        [isRefreshPhase]="isRefreshPhase"
      ></app-grandchild-phase>
    </div>
  `,
  styles: `
    .block { 
      padding: 24px; 
      margin: 8px; 
      background: #e3f2fd;
    }
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
   `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChildPhaseComponent implements DoCheck {
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
    console.log('🔄 ChildPhaseComponent change detection (Zoneless)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
