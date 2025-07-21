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
          <h4>Parent (OnPush){{ isRefreshPhase ? flash() : '' }}</h4>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-left">
          <div class="connection-line"></div>
          <app-tree-child-left-onpush
            [isRefreshPhase]="isRefreshPhase"
          ></app-tree-child-left-onpush>
        </div>

        <div class="branch-right">
          <div class="connection-line"></div>
          <app-tree-child-right-onpush
            [isRefreshPhase]="isRefreshPhase"
          ></app-tree-child-right-onpush>
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
      border: 3px solid #9c27b0;
      background: #f3e5f5;
      padding: 15px 25px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    .node-box h4 {
      margin: 0;
      color: #7b1fa2;
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
      background: #9c27b0;
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
    console.log('🔄 TreeParentOnPushComponent change detection (OnPush)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
