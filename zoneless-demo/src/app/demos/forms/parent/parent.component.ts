import {
  Component,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectionStrategy,
} from '@angular/core';
import { ChildComponent } from '../child/child.component';
import { MouseTestComponent } from '../mouse-test/mouse-test.component';

@Component({
  selector: 'app-parent',
  standalone: true,
  imports: [ChildComponent, MouseTestComponent],
  template: `
    <div class="forms-container">
      <div #container class="block">
        <p>ParentComponent (OnPush)</p>
        <app-child></app-child>
      </div>

      <app-mouse-test></app-mouse-test>
    </div>
  `,
  styles: `
    .forms-container {
      display: flex;
      gap: 20px;
      align-items: flex-start;
    }
    
    .block { 
      border: 2px solid green; 
      padding: 24px; 
      margin: 8px; 
      flex: 1;
    }
    
    .flash-outline { box-shadow: 0 0 0 2px red; transition: box-shadow 0.2s ease; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ParentComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('ParentComponent change detection (Zoneless)');
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
