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
import { TreeChildLeftComponent } from '../child-left/tree-child-left.component';
import { TreeChildRightComponent } from '../child-right/tree-child-right.component';

@Component({
  selector: 'app-tree-parent',
  standalone: true,
  imports: [CommonModule, TreeChildLeftComponent, TreeChildRightComponent],
  template: `
    <div #container class="tree-parent">
      <div class="tree-node">
        <div class="node-box">
          <h4>Parent (Default)</h4>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-left">
          <div class="connection-line"></div>
          <app-tree-child-left></app-tree-child-left>
        </div>

        <div class="branch-right">
          <div class="connection-line"></div>
          <app-tree-child-right></app-tree-child-right>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-parent {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 20px;
    }
    
    .tree-node {
      margin-bottom: 20px;
    }
    
    .node-box {
      border: 3px solid #2e7d32;
      background: #c8e6c9;
      padding: 15px 25px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #1b5e20;
      font-size: 16px;
      font-weight: bold;
    }
    
    .tree-branches {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 600px;
      gap: 40px;
    }
    
    .branch-left, .branch-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .connection-line {
      width: 3px;
      height: 30px;
      background: #2e7d32;
      margin-bottom: 10px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeParentComponent implements DoCheck {
  private flashTimeout: any;
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(private ngZone: NgZone, private renderer: Renderer2) {}

  ngDoCheck() {
    console.log('🔄 TreeParentComponent change detection (Default)');
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
