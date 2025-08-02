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
import { TreeChildRightOnPushComponent } from '../child-right/tree-child-right-onpush.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-parent-onpush',
  standalone: true,
  imports: [
    CommonModule,
    TreeChildLeftOnPushComponent,
    TreeChildRightOnPushComponent,
  ],
  template: `
    <div #container class="tree-parent">
      <div class="tree-node">
        <div class="node-box">
          <h4>Parent (Default) {{ flash() }}</h4>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-left">
          <div class="connection-line"></div>
          <app-tree-child-left-onpush></app-tree-child-left-onpush>
        </div>
        <div class="branch-right">
          <div class="connection-line"></div>
          <app-tree-child-right-onpush></app-tree-child-right-onpush>
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
       justify-content: space-between;
       width: 100%;
       max-width: 800px;
       gap: 40px;
     }
     
     .branch-left,
     .branch-right {
       display: flex;
       flex-direction: column;
       align-items: center;
       flex: 1;
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
  changeDetection: ChangeDetectionStrategy.Default,
})
export class TreeParentOnPushComponent {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private flashService: FlashService
  ) {}

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }
}
