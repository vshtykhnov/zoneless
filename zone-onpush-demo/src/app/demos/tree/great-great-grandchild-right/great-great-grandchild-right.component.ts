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
  selector: 'app-great-great-grandchild-right',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="great-great-grandchild-right">
      <div class="tree-node">
        <div class="node-box">
          <h4>Great-Great-Grandchild Right (OnPush)</h4>
        </div>
      </div>
    </div>
  `,
  styles: `
    .great-great-grandchild-right {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
    }
    
    .tree-node {
      margin-bottom: 8px;
    }
    
    .node-box {
      border: 1px solid #7b1fa2;
      background: #e1bee7;
      padding: 8px 12px;
      border-radius: 4px;
      text-align: center;
      box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #4a148c;
      font-size: 10px;
      font-weight: bold;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GreatGreatGrandchildRightComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log(
      '🔄 GreatGreatGrandchildRightComponent change detection (OnPush)'
    );
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
