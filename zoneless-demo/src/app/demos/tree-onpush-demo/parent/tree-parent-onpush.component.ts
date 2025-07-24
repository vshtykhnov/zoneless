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
import { TreeChildLeftOnPushComponent } from '../child-left/tree-child-left-onpush.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-parent-onpush',
  standalone: true,
  imports: [CommonModule, TreeChildLeftOnPushComponent],
  template: `
    <div #container class="tree-parent">
      <div class="tree-node">
        <div class="node-box">
          <h4>Parent (OnPush)</h4>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-center">
          <div class="connection-line"></div>
          <app-tree-child-left-onpush></app-tree-child-left-onpush>
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
      border: 3px solid #f57c00;
      background: #ffe0b2;
      padding: 15px 25px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #e65100;
      font-size: 16px;
      font-weight: bold;
    }
    
         .tree-branches {
       display: flex;
       justify-content: center;
       width: 100%;
       max-width: 600px;
     }
     
     .branch-center {
       display: flex;
       flex-direction: column;
       align-items: center;
     }
    
    .connection-line {
      width: 3px;
      height: 30px;
      background: #f57c00;
      margin-bottom: 10px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeParentOnPushComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 TreeParentOnPushComponent change detection (OnPush)');
    this.flashService.flash(this.container, this.renderer);
  }
}
