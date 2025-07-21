import {
  Component,
  ChangeDetectionStrategy,
  DoCheck,
  ElementRef,
  Renderer2,
  NgZone,
  ViewChild,
  ChangeDetectorRef,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeGrandchildLeftOnPushComponent } from '../grandchild-left/tree-grandchild-left-onpush.component';
import { FlashService } from '../../../services/flash.service';

@Component({
  selector: 'app-tree-child-left-onpush',
  standalone: true,
  imports: [CommonModule, TreeGrandchildLeftOnPushComponent],
  template: `
    <div #container class="tree-child-left">
      <div class="node-box">
        <h4>Child Left (OnPush){{ isRefreshPhase ? flash() : '' }}</h4>
        <div class="button-container">
          <button (click)="triggerChange()" class="trigger-btn">
            Trigger Change
          </button>
        </div>
      </div>

      <div class="tree-branches">
        <div class="branch-left">
          <div class="connection-line"></div>
          <app-tree-grandchild-left-onpush
            [isRefreshPhase]="isRefreshPhase"
          ></app-tree-grandchild-left-onpush>
        </div>

        <div class="branch-right">
          <div class="connection-line"></div>
          <app-tree-grandchild-left-onpush
            [isRefreshPhase]="isRefreshPhase"
          ></app-tree-grandchild-left-onpush>
        </div>
      </div>
    </div>
  `,
  styles: `
    .tree-child-left {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px;
    }
    
    .node-box {
      border: 3px solid #9c27b0;
      background: #f3e5f5;
      padding: 15px 20px;
      border-radius: 8px;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      margin-bottom: 20px;
    }
    
    .node-box h4 {
      margin: 0 0 10px 0;
      color: #7b1fa2;
      font-size: 14px;
      font-weight: bold;
    }
    
    .button-container {
      margin-top: 10px;
    }
    
    .trigger-btn {
      background: #ff5722;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 11px;
      font-weight: bold;
    }
    
    .trigger-btn:hover {
      background: #e64a19;
    }
    
    .tree-branches {
      display: flex;
      justify-content: space-between;
      width: 100%;
      max-width: 300px;
      gap: 20px;
    }
    
    .branch-left, .branch-right {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    
    .connection-line {
      width: 2px;
      height: 20px;
      background: #9c27b0;
      margin-bottom: 8px;
    }
    
    .flash-outline { 
      box-shadow: 0 0 0 3px red; 
      transition: box-shadow 0.2s ease; 
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TreeChildLeftOnPushComponent implements DoCheck {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLElement>;
  @Input() isRefreshPhase = false;

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2,
    private cdr: ChangeDetectorRef,
    private flashService: FlashService
  ) {}

  triggerChange() {
    console.log('🚀 Left branch button clicked - triggering change detection');
    this.cdr.detectChanges();
  }

  flash() {
    return this.flashService.flash(this.container, this.renderer);
  }

  ngDoCheck() {
    console.log('🔄 TreeChildLeftOnPushComponent change detection (OnPush)');
    if (!this.isRefreshPhase) {
      this.flashService.flash(this.container, this.renderer);
    }
  }
}
