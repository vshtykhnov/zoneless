import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-great-grandchild-right',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="great-grandchild-right">
      <div class="tree-node">
        <div class="node-box">
          <h4>Great-Grandchild Right (OnPush)</h4>
        </div>
      </div>
    </div>
  `,
  styles: `
    .great-grandchild-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
    }
    
    .tree-node {
      margin-bottom: 10px;
    }
    
    .node-box {
      border: 2px solid #1976d2;
      background: #bbdefb;
      padding: 10px 15px;
      border-radius: 6px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #0d47a1;
      font-size: 12px;
      font-weight: bold;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreatGrandchildRightComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('🔄 GreatGrandchildRightComponent change detection (OnPush)');
    if (this.container && this.container.nativeElement) {
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
}
