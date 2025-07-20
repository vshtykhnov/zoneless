import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tree-grandchild-right',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div #container class="tree-grandchild-right">
      <div class="node-box">
        <h4>Grandchild Right (Default)</h4>
        <p>{{ label }}</p>
      </div>
    </div>
  `,
  styles: `
    .tree-grandchild-right {
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .node-box {
      border: 2px solid #ffb74d;
      background: #fff8e1;
      padding: 10px 15px;
      border-radius: 6px;
      text-align: center;
      box-shadow: 0 1px 4px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0 0 5px 0;
      color: #ef6c00;
      font-size: 12px;
      font-weight: bold;
    }
    
    .node-box p {
      margin: 0;
      font-size: 10px;
      color: #f57c00;
    }
    
    .data-display {
      margin-top: 5px;
      padding: 5px;
      background: #f5f5f5;
      border-radius: 3px;
      font-size: 8px;
      color: #666;
      max-width: 120px;
      word-break: break-all;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 2px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeGrandchildRightComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() requestData: any = null;
  @Input() label: string = 'Deep nested';

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('🔄 TreeGrandchildRightComponent change detection (Default)');
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
